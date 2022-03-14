import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Box, Button, Card, CardActions, CardContent,
  CircularProgress, Container, Stack, Typography } from '@mui/material';
import { getStoredToken, saveStoredScore } from '../services/localStorageAPI';
import Header from '../components/Header';
import { getNewGameData } from '../services/fetchQuestions';
import { updateScore } from '../redux/actions';
import './Game.css';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    randomAnswers: [],
    answer: '',
    gameScore: 0,
    timer: 30,
  }

  async componentDidMount() {
    const { configs } = this.props;
    let { token } = this.props;
    if (!token) {
      token = getStoredToken();
      // return history.push('/');
    }
    const gameData = await getNewGameData({ token, ...configs });
    this.setState({
      questions: gameData.results,
      timer: configs.initialTimer },
    () => {
      this.updateTimer();
      this.setRandomAnswers();
    });
  }

  componentWillUnmount() {
    const { name, email } = this.props;
    const { gameScore } = this.state;
    const picture = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    saveStoredScore(name, gameScore, picture);
  }

  updateTimer = () => {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(() => this.setState((prevState) => {
      if (prevState.timer > 0) {
        return { timer: prevState.timer - 1 };
      }
      clearInterval(this.intervalId);
    }), ONE_SECOND);
  }

  handleAnswerClick = ({ target }) => {
    clearInterval(this.intervalId);

    const answerButtons = target.parentElement.children;
    Array.from(answerButtons).forEach((button) => {
      button.style.transition = 'none';
      if (button.value === 'correct') button.style.border = '3px solid rgb(6, 240, 15)';
      else button.style.border = '3px solid red';
    });
    this.setState({ answer: target.value });

    const { questions, currentQuestion: current, timer, gameScore } = this.state;
    const { difficulty } = questions[current];
    const multiplier = { hard: 3, medium: 2, easy: 1 };
    const minScore = 10;
    const answerScore = ((multiplier[difficulty] * timer) + minScore);
    const totalScore = (answerScore + gameScore);
    const { dispatchScore } = this.props;
    if (target.value === 'correct') {
      this.setState({ gameScore: totalScore }, () => {
        dispatchScore(totalScore);
      });
    }
  }

  handleNextButton = () => {
    const answerButtons = document.getElementsByClassName('answer-button');
    Array.from(answerButtons).forEach((button) => {
      button.style.border = '1px solid rgba(25, 118, 210, 0.5)';
    });
    const { currentQuestion, questions } = this.state;
    const { configs } = this.props;
    if (currentQuestion < questions.length - 1) {
      this.setState({
        answer: '',
        currentQuestion: currentQuestion + 1,
        timer: configs.initialTimer,
      }, () => {
        this.setRandomAnswers();
        this.updateTimer();
      });
    } else {
      const { history } = this.props;
      this.setState({
        answer: '',
        currentQuestion: 0,
        timer: configs.initialTimer,
      }, () => {
        history.push('/feedback');
      });
    }
  }

  setRandomAnswers = () => {
    const { questions, currentQuestion } = this.state;
    const { correct_answer: correct, incorrect_answers: incorrects,
    } = questions[currentQuestion];

    const answers = [
      { status: 'correct', text: correct, testid: 'correct-answer' },
      ...incorrects.map((answer, index) => (
        { status: `wrong_${index}`, text: answer, testid: `wrong-answer-${index}` }
      )),
    ];
    const MEIO = 0.5;
    const randomAnswers = answers.sort(() => Math.random() - MEIO);
    this.setState({ randomAnswers });
  }

  renderQuestion = () => {
    const { questions, currentQuestion } = this.state;
    const { category, question } = questions[currentQuestion];
    return (
      <Box sx={ { mb: 2 } }>
        <Typography
          variant="span"
          sx={ { fontSize: 18, fontWeight: 'bold' } }
          color="text.secondary"
          gutterBottom
        >
          <Box data-testid="question-text">{ question }</Box>
        </Typography>
        <Typography
          variant="span"
          sx={ { fontSize: 16 } }
          color="text.secondary"
          gutterBottom
        >
          <Box data-testid="question-category">
            {`Categoria: ${category}`}
          </Box>
        </Typography>
      </Box>
    );
  }

  renderAnswers = () => {
    const { answer: answered, timer, randomAnswers } = this.state;
    return (
      <Stack
        direction="row"
        justifyContent="center"
        data-testid="answer-options"
        sx={ { mx: 'auto' } }
      >
        {randomAnswers.map((answer) => (
          <Button
            key={ answer.status }
            type="button"
            variant="outlined"
            data-testid={ answer.testid }
            onClick={ this.handleAnswerClick }
            value={ answer.status }
            className="answer-button"
            disabled={ answered !== '' || timer === 0 }
            sx={ { mx: 2 } }
          >
            {answer.text}
          </Button>))}
      </Stack>
    );
  }

  renderTimer = () => {
    const { timer } = this.state;
    const { configs } = this.props;
    const { initialTimer } = configs;
    const countdownEquation = 100 - (initialTimer - timer) * (100 / initialTimer);
    return (
      <Box sx={ { position: 'relative', display: 'inline-flex', mb: 6 } }>
        <CircularProgress variant="determinate" value={ countdownEquation } />
        <Box
          sx={ { top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center' } }
        >
          <Typography
            variant="caption"
            color="text.secondary"
            sx={ { fontSize: 16, fontWeight: 'bold' } }
          >
            {timer}
          </Typography>
        </Box>
      </Box>
    );
  }

  render() {
    const { questions, randomAnswers, timer, answer } = this.state;
    return (
      <Stack direction="column" sx={ { height: '100vh' } }>
        <Header />
        <Container
          sx={ { pt: 8,
            bgcolor: '#FFB834',
            minWidth: '100vw',
            textAlign: 'center',
            my: 0,
            py: 8,
            flexGrow: 1 } }
        >
          {this.renderTimer()}
          <Box sx={ { maxWidth: 765, mx: 'auto' } }>
            <Card variant="outlined" sx={ { p: 4 } }>
              <CardContent>
                { questions.length > 0 && this.renderQuestion() }
              </CardContent>
              <CardActions>
                { randomAnswers.length > 0 && this.renderAnswers() }
              </CardActions>
            </Card>
          </Box>
          <Box sx={ { mx: 'auto', my: 6 } }>
            {(answer !== '' || timer === 0)
            && (
              <Button
                variant="contained"
                type="button"
                onClick={ this.handleNextButton }
                data-testid="btn-next"
              >
                Next
              </Button>
            )}
          </Box>
        </Container>
      </Stack>
    );
  }
}

Game.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  token: PropTypes.string.isRequired,
  configs: PropTypes.shape({
    quantity: PropTypes.number,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    type: PropTypes.string,
    initialTimer: PropTypes.number,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  configs: state.configs,
  email: state.player.gravatarEmail,
  name: state.player.name,
  quantity: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
