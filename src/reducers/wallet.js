// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES, ERROR } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const currenciesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.resultApi,
    };
  case ERROR:
    return {
      ...state,
      error: 'Não foi possivel acessar a API',
    };
  default:
    return state;
  }
};
export default currenciesReducer;
