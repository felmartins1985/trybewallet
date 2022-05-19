// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const ERROR = 'ERROR';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ERROR_CURRENCY = 'ERROR_CURRENCY';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const CURRENCIES_SUCESS = 'CURRENCIES_SUCESS';
export const saveUserEmail = (user) => ({
  type: SAVE_USER,
  user,
});
// requisito 6

export const getErrorCurrencies = (error) => ({ type: ERROR_CURRENCY, error });
export const currenciesSucess = (data) => ({ type: CURRENCIES_SUCESS, data });
// requisito 1
export const getError = (error) => ({ type: Error, error });
export const getCurrencies = (resultApi) => ({ type: GET_CURRENCIES, resultApi });
//
export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

export function fetchAPI() {
  return async (dispatch) => {
    try { // primeiro despacho para o store a requisição da API
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json(); // espero a requisição funcionar
      const filterKeys = Object.keys(data);
      const currenciesKey = filterKeys.filter((currency) => currency !== 'USDT');
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
