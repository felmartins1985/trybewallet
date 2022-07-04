// Esse reducer será responsável por tratar as informações da pessoa usuária
// req 1
import { SAVE_USER } from '../actions/index';

const INITIAL_STATE = {
  email: '', // é aqui que eu vinculo o que eu dispacho com oq recebe cada reducer
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.user, // eu crio a chave email para receber todas as açoes do user
    };
  default:
    return state;
  }
};
export default userReducer;
