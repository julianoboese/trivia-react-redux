import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import sanitizeHtml from 'sanitize-html';

class Questions extends PureComponent {
  render() {
    const { questions, currentQuestion } = this.props;
    if (questions.length > 0) {
      const { category, question } = questions[currentQuestion];
      const sanitizedQuestion = sanitizeHtml(question);
      return (
        <Box sx={ { mb: 2 } }>
          <Typography
            variant="span"
            sx={ { fontSize: 18, fontWeight: 'bold' } }
            color="text.secondary"
            gutterBottom
          >
            <Box data-testid="question-text">{ sanitizedQuestion }</Box>
          </Typography>
          <Typography
            variant="span"
            sx={ { fontSize: 16 } }
            color="text.secondary"
            gutterBottom
          >
            <Box data-testid="question-category">
              {`Category: ${category}`}
            </Box>
          </Typography>
        </Box>
      );
    }
    return 'loading';
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.number.isRequired,
};

export default Questions;
