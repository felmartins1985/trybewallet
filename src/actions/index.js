// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER'; // req 1
export const ERROR = 'ERROR'; // req 4
export const GET_CURRENCIES = 'GET_CURRENCIES'; // req 4
export const ERROR_CURRENCY = 'ERROR_CURRENCY'; // req 6
export const SAVE_EXPENSE = 'SAVE_EXPENSE'; // req 6
export const CURRENCIES_SUCESS = 'CURRENCIES_SUCESS'; // req 6
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

// req 1
export const saveUserEmail = (user) => ({
  type: SAVE_USER,
  user,
});

// req 6
export const getErrorCurrencies = (error) => ({ type: ERROR_CURRENCY, error });
export const currenciesSucess = (data) => ({ type: CURRENCIES_SUCESS, data });
export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

// req 4
export const getError = (error) => ({ type: Error, error });
export const getCurrencies = (resultApi) => ({ type: GET_CURRENCIES, resultApi });
// req 9
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';

export const removeExpense = (expenses) => ({
  type: REMOVE_EXPENSE,
  expenses,
});
// req 10
export const editExpense = (expensesEdit) => ({
  type: EDIT_EXPENSE,
  expensesEdit,
});

// req 4
export function fetchAPI() {
  return async (dispatch) => {
    try { // primeiro despacho para o store a requisição da API
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json(); // espero a requisição funcionar
      const filterKeys = Object.keys(data); // pego os valores das chaves da api
      const currenciesKey = filterKeys.filter((currency) => currency !== 'USDT');
      // filtro as chaves da api e peço para retirar o USDT e as despacho
      dispatch(getCurrencies(currenciesKey));
    } catch (error) {
      dispatch(getError);
    }
  };
}
// export function fetchCurrency() {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('https://economia.awesomeapi.com.br/json/all');
//       const data = await response.json();
//       dispatch(currenciesSucess(data));
//     } catch (error) {
//       dispatch(getErrorCurrencies);
//     }
//   };
// }
export default { fetchAPI, GET_CURRENCIES, saveUserEmail };
