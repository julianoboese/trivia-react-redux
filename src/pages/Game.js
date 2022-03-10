import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStoredToken } from '../services/localStorageAPI';
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
    intervalId: 0,
    timer: 30,
  }

  async componentDidMount() {
    // const { token } = this.props;
    const token = getStoredToken();
    const quantity = 5;
    const gameData = await getNewGameData(token, quantity);
    this.setState({
      questions: gameData.results,
    }, () => {
      this.setRandomAnswers();
      this.updateTimer();
    });
  }

  updateTimer = () => {
    const ONE_SECOND = 1000;
    const intervalId = setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return { intervalId, timer: prevState.timer - 1 };
        }
        clearInterval(intervalId);
      });
    }, ONE_SECOND);
  }

  handleAnswerClick = ({ target }) => {
    const { dispatchScore } = this.props;
    const { intervalId, questions, currentQuestion: current, timer } = this.state;
    const { difficulty } = questions[current];
    const multiplier = { hard: 3, medium: 2, easy: 1 };
    const minScore = 10;
    const score = ((multiplier[difficulty] * timer) + minScore);

    clearInterval(intervalId);
    const answerButtons = target.parentElement.children;
    const buttons = Object.values(answerButtons);

    buttons.forEach((button) => {
      if (button.value === 'correct') button.classList.add('correct');
      else button.classList.add('incorrect');
    });

    this.setState({
      answer: target.value,
    });
    console.log(score);
    if (target.value === 'correct') {
      this.setState({}, () => dispatchScore(score));
    }
  }

  handleNextButton = () => {
    const answerButtons = document.getElementsByClassName('answer-button');
    const buttons = Object.values(answerButtons);
    buttons.forEach((button) => {
      button.className = 'answer-button';
    });
    const { currentQuestion, questions } = this.state;
    if (currentQuestion < questions.length - 1) {
      this.setState({
        answer: '',
        currentQuestion: currentQuestion + 1,
        timer: 30,
      }, () => {
        this.setRandomAnswers();
        this.updateTimer();
      });
    } else {
      const { history } = this.props;
      this.setState({
        answer: '',
        currentQuestion: 0,
        timer: 30,
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
      ...incorrects.reduce((acc, curr, index) => ([
        ...acc,
        { status: `wrong_${index}`, text: curr, testid: `wrong-answer-${index}` },
      ]), []),
    ];

    const MEIO = 0.5;
    const randomAnswers = answers.sort(() => Math.random() - MEIO);

    this.setState({ randomAnswers });
  }

  renderQuestion = () => {
    const { questions, currentQuestion } = this.state;
    const { category, question } = questions[currentQuestion];
    return (
      <div key={ question }>
        <p data-testid="question-category">{`categoria: ${category}`}</p>
        <p data-testid="question-text">{ question }</p>
      </div>
    );
  }

  renderAnswers = () => {
    const { answer: answered, timer, randomAnswers } = this.state;

    return (
      <div data-testid="answer-options">
        {
          randomAnswers.map((answer) => (
            <button
              key={ answer.status }
              type="button"
              data-testid={ answer.testid }
              onClick={ this.handleAnswerClick }
              value={ answer.status }
              className="answer-button"
              disabled={ answered !== '' || timer === 0 }
            >
              {answer.text}
            </button>))
        }
      </div>
    );
  }

  render() {
    const { questions, randomAnswers, timer, answer } = this.state;
    return (
      <>
        <Header />
        <section>
          { questions.length > 0
          && this.renderQuestion() }
          { randomAnswers.length > 0
          && this.renderAnswers() }
        </section>
        <section>
          { timer }
          {
            (answer !== '' || timer === 0)
            && (
              <button
                type="button"
                onClick={ this.handleNextButton }
                data-testid="btn-next"
              >
                Next
              </button>
            )
          }
        </section>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatchScore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

// {
//   name: nome-da-pessoa,
//   assertions: número-de-acertos,
//   score: pontuação,
//   gravatarEmail: email-da-pessoa,
// }

// ranking: [
//   { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }
// ]
