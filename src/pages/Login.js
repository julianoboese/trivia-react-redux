import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTokenAction } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  }

  // validateEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
  //   return emailRegex.test(email);
  // }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { getToken, history } = this.props;
    getToken();
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type="text"
          name="name"
          placeholder="nome"
          value={ name }
          onChange={ this.handleChange }
          data-testid="input-player-name"
        />
        <input
          type="email"
          name="email"
          placeholder="e-mail"
          value={ email }
          onChange={ this.handleChange }
          data-testid="input-gravatar-email"
        />
        <button
          type="submit"
          disabled={ name.length === 0 || email.length === 0 }
          data-testid="btn-play"
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(getTokenAction()),
});

export default connect(null, mapDispatchToProps)(Login);
