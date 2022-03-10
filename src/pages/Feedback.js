import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const ASSERTIONS_MIN = 3;

    return (
      <div>
        <span data-testid="feedback-text">
          {assertions < ASSERTIONS_MIN ? 'Could be better...' : 'Well Done!'}
        </span>
      </div>
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
