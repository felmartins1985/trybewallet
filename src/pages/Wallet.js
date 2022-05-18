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
    const { email } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{`Email:${email}`}</p>
        <p data-testid="total-field"> Despesa Total:0 </p>
        <p data-testid="header-currency-field"> BRL </p>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});
const mapDispatchToProps = (dispatch) => ({
  currenciesFunc: () => dispatch(fetchAPI()),
});
Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currenciesFunc: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
