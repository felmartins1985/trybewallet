import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpense, editExpense } from '../actions/index';
import ExpensesTable from '../component/Expenses';
import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0, // req 6
      value: 0, // req 6
      description: '', // req 6
      currency: 'USD', // req 6
      method: 'Dinheiro', // req 6
      tag: 'Alimentação', // req 6
      exchangeRates: {}, // req 6
      editBtn: false, // req 10
      editId: 0, // req 10
      editExchangeRates: {},
    };
  }

  componentDidMount() {
    const { currenciesFunc } = this.props;
    currenciesFunc(); // nao é para aparecer na pagina, somente no redux
  }

  onClick = () => {
    const { setExpenses } = this.props;
    // faço o novo fetchAPi dentro da função
    // obs: tenho que fazer um setState dentro do outro para que nao haja atraso na atualização
    this.setState({}, async () => { // perguntar porque o 1 parametro vem vazio! será q é pq nao quero definir nada neste momento?
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      this.setState({ exchangeRates: data }, () => { // jogo o retorno da API toda dentro do exchangeRates
        const { id, value, currency, description,
          method, tag, exchangeRates } = this.state;
        const newState = { id, value, currency, description, method, tag, exchangeRates };
        setExpenses(newState); // crio um novo state porque os testes pedem para receber exatamente essas chaves
        // ao adicionar esses chaves ao estado global, peço para alterar o valor do id sempre em + 1 comparado ao ultimo
        this.setState({
          id: id + 1,
          value: '',
          description: '',
        });
      });
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  onClickEdit = (id, exchangeRates) => { // função que serve para eu editar uma despesa e mante-la na mesma ordem
    // alem disso, ao editar eu preciso manter os mesmos valores de antes de eu editar a despesa
    // por isso eu faço uma nova chave no state para editar o id e o exchange rate
    const { editBtn } = this.state;
    if (!editBtn) {
      this.setState({
        editBtn: true,
        editId: id, // o editId vai receber o id antigo
        editExchangeRates: exchangeRates,
      });
    } else {
      this.setState({
        editBtn: false,
        editId: id, // o editId vai receber o id antigo
        editExchangeRates: exchangeRates,
      });
    }
  }

  onClickEditForm = () => { // serve para adicionar e editar a despesa
    // pego por props as despesas e a funçao para mandar a despesa editada
    const { expenses, editExpenseFunc } = this.props;
    const { editId, editExchangeRates, value,
      currency, method, tag, description } = this.state;
    // crio uma constante para fazer uma expense editada recebendo o valor do id editado e o exchange rate editado
    const newExpenseEdit = {
      id: editId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: editExchangeRates,
    };
    // faço um map dentro das expenses e procuro dentro delas um id que seja igual ao editId
    // caso possua um igual, vai ser retornada a constante criada com o id e o exchangeRates editado
    // isso serve para que os ids continuem na mesma ordem
    const updateExpense = expenses.map((expense) => {
      if (expense.id === editId) { // faço essa comparação para que nao haja alteração da ordem dos ids
        return newExpenseEdit;
      } return expense;
    });
    editExpenseFunc(updateExpense);
    this.setState({ value: '', description: '', editBtn: false });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag, editBtn } = this.state;
    // faço um reduce com as expenses enviadas para o estado global
    const descriptionExpense = expenses.reduce((acc, exp) => { // req 8
      // desestruturo o que vem em cada expense
      const { value: valueExp, currency: currencyExp, exchangeRates } = exp;
      // depois pego os valores de cada exchangeRates dos objetos
      const expenseObj = Object.values(exchangeRates);
      // depois pego esses valores e faço um filter para buscar um code igual ao currency que crio no state
      const filterExpenseObj = expenseObj.filter((obj) => obj.code === currencyExp);
      // faço somas para mostrar o valor total dos gastos utizando a cotação atual vezes o valor gasto
      acc += filterExpenseObj[0].ask * valueExp;
      return acc;
    }, 0);
    return (
      <div className="walletContainer">
        <header className="headerWallet">
          <h1 className="text-center">TrybeWallet</h1>
          <div className="headerWalletDiv">
            <p className="text-center, emailWallet" data-testid="email-field">{`Email:${email}`}</p>
            {/* email vem por meio de props do estado global */}
            <p className="text-center, expenseWallet" data-testid="total-field">
              {`R$ ${descriptionExpense.toFixed(2)} `}
              {/* é p valor total gasto, nao importando quantos asks utilizo */}
            </p>
            {/* <p data-testid="header-currency-field"> BRL </p> */}
          </div>
        </header>
        <form className="mb-3 formWallet">
          <label htmlFor="input-value" className="form-label">
            Valor da Despesa:
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              id="input-value"
              onChange={ this.handleChange }
              className="form-control form-control-sm"
            />
          </label>
          <label htmlFor="input-description" className="form-label">
            Descrição da Despesa:
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              id="input-description"
              onChange={ this.handleChange }
              className="form-control form-control-sm"
            />
          </label>
          <label htmlFor="input-currencies" className="form-label">
            Moeda
            <select
              className="form-select form-select-lg mb-1"
              aria-label=".form-select-lg example"
              name="currency"
              id="input-currencies"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
              className="form-control form-control-sm"
            >
              {currencies.map((coin, index) => (
                <option value={ coin } key={ index }>{coin}</option>
              ))}
            </select>
          </label>
          <label htmlFor="input-method" className="form-label">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              id="input-method"
              onChange={ this.handleChange }
              className="form-control form-control-sm"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito"> Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="input-tag" className="form-label">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              id="input-tag"
              onChange={ this.handleChange }
              className="form-control form-control-sm"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <label className="btnWallet" htmlFor="btnExpense">
          {
            editBtn ? (
              <button
                type="button"
                onClick={ this.onClickEditForm }
                className="btn btn-primary"
                id="btnExpense"
              >
                Editar despesa
              </button>
            ) : (
              <button
                type="button"
                onClick={ this.onClick }
                className="btn btn-primary"
                id="btnExpense"
              >
                Adicionar despesa
              </button>
            )
          }
        </label>
        {/* <table className="table">
          <thead>
            <th scope="col">Descrição</th>
            <th scope="col">Tag</th>
            <th scope="col">Método de pagamento</th>
            <th scope="col">Valor</th>
            <th scope="col">Moeda</th>
            <th scope="col">Câmbio utilizado</th>
            <th scope="col">Valor convertido</th>
            <th scope="col">Moeda de conversão</th>
            <th scope="col">Editar/Excluir</th>
          </thead>
        </table> */}
        <div>
          <ExpensesTable onClickEdit={ this.onClickEdit } />
        </div>

      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies, // pego do estado global
  expenses: state.wallet.expenses, // pego do estado global
});
const mapDispatchToProps = (dispatch) => ({
  currenciesFunc: () => dispatch(fetchAPI()), // ação chamada para buscar a API e despacha-la
  setExpenses: (state) => dispatch(saveExpense(state)), // ação chamada para buscar as expenses criadas
  editExpenseFunc: (updateExpense) => dispatch(editExpense(updateExpense)),
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesFunc: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  setExpenses: PropTypes.func.isRequired,
  editExpenseFunc: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
