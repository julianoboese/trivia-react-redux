import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getNewGameData } from '../services/fetchQuestions';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
  }

  async componentDidMount() {
    const { token } = this.props;
    const defaultQuestionsQuantity = 5;
    const quantity = defaultQuestionsQuantity;
    console.log(token);
    const gameData = await getNewGameData(token, quantity);
    this.setState({
      questions: gameData.results,
    });
  }

  renderAnswerButtons = (correct, incorrects, type) => {
    const MEIO = 0.5;
    let answersObj = {
      correct: { text: correct, testid: 'correct-answer' },
      wrong_1: { text: incorrects[0], testid: 'wrong-answer-0' },
    };
    if (type === 'multiple') {
      answersObj = {
        correct: { text: correct, testid: 'correct-answer' },
        wrong_1: { text: incorrects[0], testid: 'wrong-answer-0' },
        wrong_2: { text: incorrects[1], testid: 'wrond-answer-1' },
        wrong_3: { text: incorrects[2], testid: 'wrond-answer-2' },
      };
    }

    const answerArray = Object.entries(answersObj).sort(() => Math.random() - MEIO);

    return answerArray.map((answer) => (
      <button key={ answer[0] } type="button" data-testid={ answer[1].testid }>
        {answer[1].text}
      </button>
    ));
  }

  renderQuestions = () => {
    const { questions } = this.state;
    return (
      questions.map((questionData, index) => {
        const {
          correct_answer: correct, incorrect_answers: incorrects,
          category, question, dificult, type,
        } = questionData;
        const buttons = this.renderAnswerButtons(correct, incorrects, type);
        return (
          <div key={ `${dificult}, ${index}` }>
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

  render() {
    const { currentQuestion } = this.state;
    return (
      <>
        <Header />
        <section>
          { this.renderQuestions()[currentQuestion] }
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
