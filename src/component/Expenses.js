import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  descriptionExpense = (descriptionTable) => { // req 8- o que é passado como parametro é o expenses
    const { value, currency, exchangeRates } = descriptionTable;
    console.log(value);
    // retorna um array de valores da chave exchangeRates
    const expenseObj = Object.values(exchangeRates);
    // filtro pela moeda que vai ser usada e retorna um array de objetos
    const filterExpenseObj = expenseObj.filter((obj) => obj.code === currency);
    // console.log(filterExpenseObj)
    // ao utilizar o split, transformo o name em um array. Entao, peço para pegar apenas a primeira parte do array
    const coin = filterExpenseObj[0].name.split('/')[0];
    // console.log(coin);
    // pego o array fornecido e peço a sua cotaçao. utilizo o number porque ele vem em forma de string;
    const conversion = Number(filterExpenseObj[0].ask);
    const totalValue = Number(value) * conversion;
    return { coin, conversion, totalValue }; // consigo retornar mais uma constante
  }

  onClick = (id) => {
    const { removeExp, expenses } = this.props;
    // eu pego as expenses e peço, por meio do filtro, que seja retornado um array com todas as expenses, salvo a que eu cliquei
    const filterExpenses = expenses.filter((expense) => expense.id !== id);
    removeExp(filterExpenses); // despacha para o estado global a nova lista de expenses
  }

  render() {
    const { expenses, onClickEdit } = this.props;
    return (
      <div>
        <table className="table">
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
          {expenses.map((expense, index) => (
            <tr key={ index }>
              <th scope="col">{expense.description}</th>
              <th scope="col">{expense.tag}</th>
              <th scope="col">{expense.method}</th>
              <th scope="col">{Number(expense.value).toFixed(2)}</th>
              <th scope="col">{this.descriptionExpense(expense).coin}</th>
              <th scope="col">
                {this.descriptionExpense(expense).conversion.toFixed(2)}
              </th>
              <th scope="col">{this.descriptionExpense(expense).totalValue.toFixed(2)}</th>
              <th scope="col">Real</th>
              <th scope="col">
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => onClickEdit(expense.id, expense.exchangeRates) }
                  className="btn btn-secondary"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={ () => this.onClick(expense.id) }
                  data-testid="delete-btn"
                  className="btn btn-danger"
                >
                  Excluir
                </button>
              </th>
            </tr>))}
        </table>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExp: (expensiveFilter) => dispatch(removeExpense(expensiveFilter)),

});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  removeExp: PropTypes.func.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
