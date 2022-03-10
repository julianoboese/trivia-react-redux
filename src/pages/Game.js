import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { getStoredToken } from '../services/localStorageAPI';
import Header from '../components/Header';
import { getNewGameData } from '../services/fetchQuestions';

class Game extends Component {
  state = {
    questions: [],
    currentQuestion: 0,
  }

  async componentDidMount() {
    // const { token } = this.props;
    const token = getStoredToken();
    const defaultQuestionsQuantity = 5;
    const quantity = defaultQuestionsQuantity;
    console.log(token);
    const gameData = await getNewGameData(token, quantity);
    this.setState({
      questions: gameData.results,
    });
  }

  renderAnswerButtons = (correct, incorrects) => {
    const answers = [
      { status: 'correct', text: correct, testid: 'correct-answer' },
      ...incorrects.reduce((acc, curr, index) => ([
        ...acc,
        { status: `wrong_${index}`, text: curr, testid: `wrong-answer-${index}` },
      ]), []),
    ];

    const MEIO = 0.5;
    const randomAnswers = answers.sort(() => Math.random() - MEIO);

    return randomAnswers.map((answer) => (
      <button key={ answer.status } type="button" data-testid={ answer.testid }>
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
          category, question, dificult, type,
        } = questionData;
        const buttons = this.renderAnswerButtons(correct, incorrects);
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

// const mapStateToProps = (state) => ({
//   token: state.token,
// });

// Game.propTypes = {
//   token: PropTypes.string.isRequired,
// };

// export default connect(mapStateToProps)(Game);

export default Game;
