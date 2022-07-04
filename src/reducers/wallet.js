// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES, ERROR, SAVE_EXPENSE,
  REMOVE_EXPENSE, EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const currenciesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.resultApi, // peço para adicionar o parametro do fetch da api dentro do currencies caso seja essa ação
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses], // faço spread do expenses para poder pegar as expenses ja existentes e adicionar mais uma
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.expensesEdit,
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
