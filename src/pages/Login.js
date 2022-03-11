import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Paper, TextField } from '@mui/material';
import { userLoginAction } from '../redux/actions';
import './Login.css';

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

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { userLogin, history } = this.props;
    await userLogin(name, email);
    history.push('/game');
  }

  render() {
    const { email, name } = this.state;
    return (
      <main>
        <section className="image-section">
          <div className="image-container" />
        </section>
        <section className="form-section">
          <Paper elevation={ 10 } sx={ { my: 4, mx: 'auto', width: 1 / 2, py: 1, px: 4 } }>
            <form onSubmit={ this.handleSubmit }>

              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                size="small"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                inputProps={ { 'data-testid': 'input-player-name' } }
              />
              <TextField
                className="email-input"
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                size="small"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                inputProps={ { 'data-testid': 'input-gravatar-email' } }
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={ name.length === 0 || email.length === 0 }
                data-testid="btn-play"
              >
                Play
              </Button>

            </form>
          </Paper>
        </section>
        <Button
          component={ Link }
          to="/config"
          type="button"
          variant="contained"
          size="large"
          data-testid="btn-settings"
        >
          Configurações
        </Button>

      </main>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (name, email) => dispatch(userLoginAction(name, email)),
});

export default connect(null, mapDispatchToProps)(Login);
