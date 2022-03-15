import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <Stack direction="column" sx={ { height: '100vh' } }>
        <Header />
        <Container
          sx={ { pt: 8,
            bgcolor: '#FFB834',
            minWidth: '100vw',
            textAlign: 'center',
            my: 0,
            py: 8,
            flexGrow: 1 } }
        >
          <Paper
            elevation={ 10 }
            sx={ { my: 8, mx: 'auto', width: 0.6, py: 1, px: 4 } }
          >
            <Typography variant="span" gutterBottom data-testid="feedback-text">
              <Box
                sx={ { width: '100%',
                  fontWeight: 'bold',
                  fontSize: 48,
                  textAlign: 'center' } }
              >
                {assertions < MIN_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
              </Box>
            </Typography>
            <Box
              component="div"
              gutterBottom
              sx={ { m: 2 } }
            >
              Pontuação:
              { ' ' }
              <Typography
                variant="span"
                data-testid="feedback-total-score"
                sx={ { width: '100%',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center' } }
              >
                {score}
              </Typography>
            </Box>
            <Box
              component="div"
              gutterBottom
              sx={ { m: 2 } }
            >
              Total de acertos:
              { ' ' }
              <Typography
                variant="span"
                data-testid="feedback-total-question"
                sx={ { width: '100%',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center' } }
              >
                {assertions}
              </Typography>
            </Box>
            <Button
              component={ Link }
              to="/"
              type="button"
              variant="contained"
              color="success"
              size="large"
              data-testid="btn-play-again"
              sx={ { m: 2 } }
            >
              Play Again
            </Button>
            <Button
              component={ Link }
              to="/ranking"
              type="button"
              variant="contained"
              size="large"
              color="secondary"
              data-testid="btn-ranking"
              sx={ { m: 2 } }
            >
              Ranking
            </Button>
          </Paper>
        </Container>
      </Stack>
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
