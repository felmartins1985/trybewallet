import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserEmail } from '../actions/index';
import './Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true, // nao passo para o estado global
      email: '',
      password: '',
    };
  }

  onClick = () => {
    const { history, sendUser } = this.props; // desestruturo a ação do dispatch e o history para fazer mudar de pagina
    const { email } = this.state;
    sendUser(email);
    history.push('/carteira');
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, () => this.handleBtn());
  }

  handleBtn = () => { // é a ação para liberar o botao de ser clicado
    const { email, password } = this.state;
    const minPassword = 6;
    const checkEmail = email.includes('@');
    const checkEmailCom = email.includes('.com');
    if (password.length >= minPassword && checkEmail && checkEmailCom) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  // // validateEmail = (email) => {
  //   const re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // } poderia usar ao inves do checkemail e checkemailcom usar o if validateEMail (email) com o password.length

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="login ">
        <div className="boarderLogin">
          <div className="form-floating">
            <h2>TrybeWallet</h2>
            <label htmlFor="input-email">
              Email:
              <input
                type="email"
                name="email"
                data-testid="email-input"
                id="input-email"
                value={ email }
                onChange={ this.handleChange }
                className="form-control"

              />
            </label>
          </div>
          <div className="form-floating">
            <label htmlFor="input-password">
              Senha:
              <input
                type="password"
                name="password"
                data-testid="password-input"
                id="input-password"
                value={ password }
                onChange={ this.handleChange }
                className="form-control"
              />
            </label>
          </div>
          <button
            type="button"
            className="btn btn-success"
            disabled={ disabled }
            onClick={ this.onClick }
          >
            Entrar

          </button>
        </div>
      </div>);
  }
}
const mapDispatchToProps = (dispatch) => ({
  sendUser: (email) => dispatch(saveUserEmail(email)), // pego o nome da ação criada para usar como parametro do dispatch e passo como parametro da ação oq eu quero enviar para o estado global
});
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendUser: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
