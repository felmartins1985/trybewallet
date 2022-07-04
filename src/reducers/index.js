import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({ // é no rootReducer que eu defino o nome de cada chave que vai aparecer no redux
  user, wallet,
});

export default rootReducer;
