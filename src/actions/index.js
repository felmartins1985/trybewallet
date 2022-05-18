// Coloque aqui suas actions
export const SAVE_USER = 'SAVE_USER';
export const REQUEST_API = 'REQUEST_API';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ERROR = 'ERROR';
export const saveUserEmail = (user) => ({
  type: SAVE_USER,
  user,
});
export const getCurrencies = (resultApi) => ({ type: GET_CURRENCIES, resultApi });
export const getError = (error) => ({ type: Error, error });

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
export default { fetchAPI, SAVE_USER, GET_CURRENCIES, ERROR, saveUserEmail };
