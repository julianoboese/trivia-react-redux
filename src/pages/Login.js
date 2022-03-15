import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Button, Container, Paper, Stack, TextField } from '@mui/material';
import { userLoginAction } from '../redux/actions';
import triviaLogo from '../assets/images/trivia-logo.gif';

class Login extends Component {
  state = {
    name: '',
    email: '',
    nameChanged: false,
    emailChanged: false,
    isDisabled: true,
  }

  validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/igm;
    return emailRegex.test(email);
  }

  validateLogin = () => {
    const { name, email } = this.state;
    const verification = (name !== '' && this.validateEmail(email));
    return !verification;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const secondState = `${name}Changed`;
    this.setState(({ [name]: value, [secondState]: true }), () => this
      .setState({ isDisabled: this.validateLogin() }));
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const { userLogin, history } = this.props;
    await userLogin(name, email);
    history.push('/game');
  }

  handleEmailErrorTxt = () => {
    const { email, emailChanged } = this.state;
    if (this.validateEmail(email) || !emailChanged) return '';
    if (email === '') return 'Adicione um email';
    return 'Email inválido';
  }

  render() {
    const { email, name, emailChanged, nameChanged, isDisabled } = this.state;
    const { validateEmail, handleEmailErrorTxt } = this;
    return (
      <Stack
        direction="column"
        spacing={ 6 }
        sx={ { bgcolor: '#FFB834',
          alignItems: 'center',
          height: '100vh' } }
      >
        <Container sx={ { bgcolor: 'black', minWidth: '100vw' } }>
          <Box
            className="image-container"
            sx={ { backgroundImage: `url(${triviaLogo})`,
              backgroundSize: 'cover',
              boxShadow: '25px 25px 50px 0 black inset , -25px -25px 50px 0 black inset',
              mx: 'auto',
              height: '26vw',
              width: '50vw' } }
          />
        </Container>
        <Paper
          elevation={ 10 }
          sx={ { mx: 'auto', width: 1 / 2, py: 1, px: 4 } }
        >
          <form onSubmit={ this.handleSubmit }>
            <Stack direction="row" spacing={ 2 } sx={ { my: 4 } }>
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                size="small"
                name="name"
                value={ name }
                onChange={ this.handleChange }
                sx={ { flex: 2 } }
                inputProps={ { 'data-testid': 'input-player-name' } }
                error={ name === '' && nameChanged }
                helperText={ name === '' && nameChanged ? 'Um nome é necessário' : '' }
              />
              <TextField
                id="outlined-basic"
                label="E-mail"
                variant="outlined"
                size="small"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                sx={ { flex: 3 } }
                inputProps={ { 'data-testid': 'input-gravatar-email' } }
                error={ emailChanged && (email === '' || !validateEmail(email)) }
                helperText={ handleEmailErrorTxt() }
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                size="large"
                disabled={ isDisabled }
                sx={ { flex: 1 } }
                data-testid="btn-play"
              >
                Play
              </Button>
            </Stack>

          </form>
        </Paper>
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
        <Button
          component={ Link }
          to="/ranking"
          type="button"
          variant="contained"
          size="large"
        >
          Ranking
        </Button>

      </Stack>
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
