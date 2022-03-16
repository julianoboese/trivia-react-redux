import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, CardContent,
  MenuItem, Select, Typography } from '@mui/material';
import sanitizeHtml from 'sanitize-html';

export default class LastGameDisplayer extends PureComponent {
  state = {
    questionIndex: 0,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const secondState = `${name}Changed`;
    this.setState(({ [name]: value, [secondState]: true }));
  };

  render() {
    const { questionIndex } = this.state;
    const { lastGameData } = this.props;
    const { name, questions, picture, score } = lastGameData;

    const correctQuestions = questions.filter(({ answered }) => answered === 'correct');
    const incorrectQuestions = questions
      .filter(({ answered }) => answered === 'incorrect');

    const currentQuestion = questions[+questionIndex];
    const { correct_answer: correct, incorrect_answers: incorrects,
    } = currentQuestion;
    const answers = [
      { status: 'correct', text: correct },
      ...incorrects.map((answer, index) => (
        { status: `wrong_${index}`, text: answer }
      )),
    ];
    if (lastGameData) {
      return (
        <Card sx={ { maxWidth: '100%' } }>
          <CardContent sx={ { textAlign: 'center' } }>
            <Typography component="p" variant="h5">
              { `Name: ${name}` }
            </Typography>
            <Avatar
              alt={ `player: ${name} avatar` }
              src={ picture }
              style={ { width: '5em', margin: 'auto', height: '5em' } }
              align="center"
            />
          </CardContent>
          <CardContent sx={ { textAlign: 'center' } }>
            <Typography component="p">{ `Score: ${score}` }</Typography>
            <Typography component="p">
              { `Number of questions: ${questions.length}` }
              <br />
              <Typography component="span" sx={ { color: 'green' } }>
                { `Correct: ${correctQuestions.length}` }
              </Typography>
              { ' ' }
              <Typography component="span" sx={ { color: 'red' } }>
                { `Incorrect: ${incorrectQuestions.length}` }
              </Typography>
            </Typography>
            <Select
              name="questionIndex"
              value={ +questionIndex }
              onChange={ this.handleChange }
              inputProps={ { value: +questionIndex } }
              sx={ { maxWidth: '100%' } }
            >
              {questions.map(({ question }, index) => (
                <MenuItem value={ index } key={ question }>
                  {sanitizeHtml(question)}
                </MenuItem>
              ))}
            </Select>
            <CardContent>
              Answers:
              { answers.map(({ text, status }) => (
                <Typography
                  key={ text }
                  sx={ { color: status === 'correct' ? 'green' : 'black' } }
                >
                  {text}
                </Typography>
              )) }
            </CardContent>
          </CardContent>
        </Card>
      );
    }

    return '';
  }
}

LastGameDisplayer.propTypes = {
  lastGameData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
};
