import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense } from '../actions';

class ExpensesTable extends React.Component {
  descriptionExpense = (descriptionTable) => {
    const { value, currency, exchangeRates } = descriptionTable;
    const expenseObj = Object.values(exchangeRates);
    const filterExpenseObj = expenseObj.filter((obj) => obj.code === currency);
    // console.log(filterExpenseObj)
    const coin = filterExpenseObj[0].name.split('/')[0];
    const conversion = Number(filterExpenseObj[0].ask);
    const totalValue = Number(value) * conversion;
    return { coin, conversion, totalValue };
  }

  onClick = (id) => {
    const { removeExp, expenses } = this.props;
    const filterExpenses = expenses.filter((expense) => expense.id !== id);
    removeExp(filterExpenses);
  }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        {expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{Number(expense.value).toFixed(2)}</td>
            <td>{this.descriptionExpense(expense).coin}</td>
            <td>
              {this.descriptionExpense(expense).conversion.toFixed(2)}
            </td>
            <td>{this.descriptionExpense(expense).totalValue.toFixed(2)}</td>
            <td>Real</td>
            <td>
              <button type="button">Editar</button>
              <button
                type="button"
                onClick={ () => this.onClick(expense.id) }
                data-testid="delete-btn"
              >
                Excluir
              </button>
            </td>
          </tr>))}
      </table>

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
};
export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
