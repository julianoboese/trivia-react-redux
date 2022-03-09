import React, { Component } from 'react';

export default class Login extends Component {
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

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const { email } = this.state;
  //   const { userLogin, history } = this.props;
  //   userLogin(email);
  //   history.push('/carteira');
  // }

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
