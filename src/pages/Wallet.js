import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { currenciesFunc } = this.props;
    currenciesFunc();
  }

  render() {
    const { email, currencies } = this.props;
    return (
      <div>
        <header>
          <h1>TrybeWallet</h1>
          <p data-testid="email-field">{`Email:${email}`}</p>
          <p data-testid="total-field"> Despesa Total:0 </p>
          <p data-testid="header-currency-field"> BRL </p>
        </header>
        );
        <form>
          <label htmlFor="input-value">
            Valor da Despesa:
            <input type="number" data-testid="value-input" id="input-value" />
          </label>
          <label htmlFor="input-description">
            Descrição da Despesa:
            <input type="text" data-testid="description-input" id="input-description" />
          </label>
          <label htmlFor="input-currencies">
            Moeda
            <select id="input-currencies">
              {currencies.map((currency, index) => (
                <option key={ index }>{currency}</option>
              ))}
            </select>
          </label>
          <label htmlFor="input-method">
            Método de pagamento:
            <select data-testid="method-input" id="input-method">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option> Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="input-tag">
            Categoria:
            <select data-testid="tag-input" id="input-tag">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  currenciesFunc: () => dispatch(fetchAPI()),
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesFunc: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
