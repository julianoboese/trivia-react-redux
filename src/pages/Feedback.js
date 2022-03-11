import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <div className="feedback-score-container">
          Pontuação:
          <span data-testid="feedback-total-score">
            {score}
          </span>
        </div>
        <div className="feedback-total-assertions-container">
          Total de acertos:
          <span data-testid="feedback-total-question">{assertions}</span>
        </div>
        <div className="feedback-text-container">
          <span data-testid="feedback-text">
            {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
          </span>
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ranking</button>
        </Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
