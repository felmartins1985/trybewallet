import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpense, editExpense } from '../actions/index';
import ExpensesTable from '../component/Expenses';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
      editBtn: false,
      editId: 0,
      editExchangeRates: {},
    };
  }

  componentDidMount() {
    const { currenciesFunc } = this.props;
    currenciesFunc();
  }

  onClick = () => {
    const { setExpenses } = this.props;
    this.setState({}, async () => {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      this.setState({ exchangeRates: data }, () => {
        const { id, value, currency, description,
          method, tag, exchangeRates } = this.state;
        const newState = { id, value, currency, description, method, tag, exchangeRates };
        setExpenses(newState);
        this.setState({
          id: id + 1,
          value: '',
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

  onClickEditForm = () => {
    const { expenses, editExpenseFunc } = this.props;
    const { editId, editExchangeRates, value,
      currency, method, tag, description } = this.state;
    const newExpenseEdit = {
      id: editId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: editExchangeRates,
    };
    const updateExpense = expenses.map((expense) => {
      if (expense.id === editId) {
        return newExpenseEdit;
      } return expense;
    });
    editExpenseFunc(updateExpense);
  }

  onClickEdit = (id, exchangeRates) => {
    const { editBtn } = this.state;
    if (!editBtn) {
      this.setState({
        editBtn: true,
        editId: id,
        editExchangeRates: exchangeRates,
      });
    } else {
      this.setState({
        editBtn: false,
        editId: id,
        editExchangeRates: exchangeRates,
      });
    }
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag, editBtn } = this.state;
    const descriptionExpense = expenses.reduce((acc, exp) => {
      const { value: valueExp, currency: currencyExp, exchangeRates } = exp;
      const expenseObj = Object.values(exchangeRates);
      const filterExpenseObj = expenseObj.filter((obj) => obj.code === currencyExp);
      acc += filterExpenseObj[0].ask * valueExp;
      return acc;
    }, 0);
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{`Email:${email}`}</p>
          <p data-testid="total-field">
            {descriptionExpense.toFixed(2)}
          </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        <form>
          <label htmlFor="input-value">
            Valor da Despesa:
            <input
              type="number"
              name="value"
              value={ value }
              data-testid="value-input"
              id="input-value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-description">
            Descrição da Despesa:
            <input
              type="text"
              name="description"
              value={ description }
              data-testid="description-input"
              id="input-description"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-currencies">
            Moeda
            <select
              name="currency"
              id="input-currencies"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"

            >
              {currencies.map((coin, index) => (
                <option value={ coin } key={ index }>{coin}</option>
              ))}
            </select>
          </label>
          <label htmlFor="input-method">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              data-testid="method-input"
              id="input-method"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito"> Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="input-tag">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              value={ tag }
              id="input-tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            {
              editBtn ? (
                <button
                  type="button"
                  onClick={ this.onClickEditForm }
                >
                  Editar despesa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={ this.onClick }
                >
                  Adicionar despesa
                </button>
              )
            }
          </label>
        </form>
        <table>

          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>

        </table>
        <div>
          <ExpensesTable onClickEdit={ this.onClickEdit } />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  currenciesFunc: () => dispatch(fetchAPI()),
  setExpenses: (state) => dispatch(saveExpense(state)),
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
