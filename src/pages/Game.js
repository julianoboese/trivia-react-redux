import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { getStoredToken } from '../services/localStorageAPI';
import Header from '../components/Header';
import { getNewGameData } from '../services/fetchQuestions';
import './Game.css';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
    answer: '',
    timer: 30,
  }

  async componentDidMount() {
    // const { token } = this.props;
    const token = getStoredToken();
    const quantity = 5;
    console.log(token);
    const gameData = await getNewGameData(token, quantity);
    this.setState({
      questions: gameData.results,
    }, () => this.updateTimer());
  }

  updateTimer = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => {
        if (prevState.timer > 0) {
          return { timer: prevState.timer - 1 };
        }
      });
    }, ONE_SECOND);
  }

  handleAnswerClick = ({ target }) => {
    const answerButtons = target.parentElement.children;
    const buttons = Object.values(answerButtons);
    buttons.forEach((button) => {
      if (button.value === 'correct') button.classList.add('correct');
      else button.classList.add('incorrect');
    });
    this.setState({
      answer: target.value,
    });
  }

  renderAnswerButtons = (correct, incorrects) => {
    const { answer: answered } = this.state;
    const answers = [
      { status: 'correct', text: correct, testid: 'correct-answer' },
      ...incorrects.reduce((acc, curr, index) => ([
        ...acc,
        { status: `wrong_${index}`, text: curr, testid: `wrong-answer-${index}` },
      ]), []),
    ];

    const MEIO = 0.5;
    const randomAnswers = answers.sort(() => Math.random() - MEIO);

    const { timer } = this.state;
    return randomAnswers.map((answer) => (
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
      </button>
    ));
  }

  renderQuestions = () => {
    const { questions } = this.state;
    return (
      questions.map((questionData, index) => {
        const {
          correct_answer: correct, incorrect_answers: incorrects,
          category, question, difficulty,
        } = questionData;
        const buttons = this.renderAnswerButtons(correct, incorrects);
        return (
          <div key={ `${difficulty}, ${index}` }>
            <p data-testid="question-category">{`categoria: ${category}`}</p>
            <p data-testid="question-text">{ question }</p>
            <div data-testid="answer-options">
              {buttons}
            </div>
          </div>
        );
      })
    );
  }

  handleNextButton = () => {
    const { currentQuestion, questions } = this.state;
    if (currentQuestion < questions.length - 1) {
      this.setState({
        answer: '',
        currentQuestion: currentQuestion + 1,
      });
    }
  }

  render() {
    const { currentQuestion, answer } = this.state;
    return (
      <>
        <Header />
        <section>
          { this.renderQuestions()[currentQuestion] }
          {
            answer !== ''
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

// const mapStateToProps = (state) => ({
//   token: state.token,
// });

// Game.propTypes = {
//   token: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps)(Game);

export default Game;
