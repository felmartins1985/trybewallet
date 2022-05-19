import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ExpensesTable extends React.Component {
  descriptionExpense = (descriptionTable) => {
    const { value, currency, exchangeRates } = descriptionTable;
    const expenseObj = Object.values(exchangeRates);
    const filterExpenseObj = expenseObj.filter((obj) => obj.code === currency);
    const coin = filterExpenseObj[0].name.split('/')[0];
    const conversion = Number(filterExpenseObj[0].ask);
    const totalValue = Number(value) * conversion;
    return { coin, conversion, totalValue };
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
            <td>{ }</td>
          </tr>))}
      </table>

    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
export default connect(mapStateToProps)(ExpensesTable);
