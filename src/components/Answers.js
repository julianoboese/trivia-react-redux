import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import sanitizeHtml from 'sanitize-html';

class Answers extends Component {
  shouldComponentUpdate(nextProps) {
    const { answer, randomAnswers } = this.props;
    return ((answer !== nextProps.answer)
    || randomAnswers !== nextProps.randomAnswers
    || nextProps.timer === 0);
  }

  render() {
    const { answer: answered, handleAnswerClick, randomAnswers, timer } = this.props;
    const sanitizedAnswersTxt = randomAnswers.map((answer) => sanitizeHtml(answer.text));
    if (randomAnswers.length > 0) {
      return (
        <Stack
          direction="row"
          justifyContent="center"
          data-testid="answer-options"
          sx={ { mx: 'auto' } }
        >
          {randomAnswers.map((answer, index) => (
            <Button
              key={ answer.status }
              type="button"
              variant="outlined"
              data-testid={ answer.testid }
              onClick={ handleAnswerClick }
              value={ answer.status }
              className="answer-button"
              disabled={ answered !== '' || timer === 0 }
              sx={ { mx: 2, textTransform: 'none' } }
            >
              {sanitizedAnswersTxt[index]}
            </Button>))}
        </Stack>
      );
    }
    return 'loading';
  }
}

Answers.propTypes = {
  randomAnswers: PropTypes.arrayOf(PropTypes.object).isRequired,
  timer: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
};

export default Answers;
