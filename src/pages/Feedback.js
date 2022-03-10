import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <span data-testid="feedback-text">
          {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </span>
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
});

Feedback.propTypes = {
  assertions: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
