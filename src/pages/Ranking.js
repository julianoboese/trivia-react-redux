import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box, Button, Paper } from '@mui/material';
import { getStoredRanking } from '../services/localStorageAPI';
import triviaLogo from '../assets/images/trivia-logo.gif';
import LastGameDisplayer from '../components/LastGameDataDisplayer';
import RankingTable from '../components/RankingTable';

export default class Ranking extends Component {
  render() {
    const rankingArray = getStoredRanking() || [];
    const lastGameData = [...rankingArray]
      .sort(({ date: { id: a } }, { date: { id: b } }) => b - a)[0];
    // const FIVE = 5;
    // const TEN = 10;
    // const TWENTY = 20;
    return (
      <Grid
        container
        direction="row"
        alignItems="stretch"
        sx={ { backgroundColor: 'black', minHeight: '100vh' } }
      >
        <Grid
          item
          xs={ 2 }
          sx={ { maxHeight: '10vw' } }
        >
          <Box component={ Link } to="/">
            <Box
              component="img"
              sx={ {
                mt: 1.7,
                ml: 4,
                maxHeight: '75px',
              } }
              alt="Logo do trivia"
              src={ triviaLogo }
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={ 8 }
          sx={ { maxHeight: '10vw' } }
        >
          <Typography
            align="center"
            variant="h1"
            data-testid="ranking-title"
            paragraph
            sx={ {
              m: 0,
              p: 3,
              backgroundColor: 'black',
              fontSize: 46,
              fontWeight: 'bold',
              color: 'white',
            } }
          >
            RANKING
          </Typography>
        </Grid>
        <Grid
          item
          sx={ { backgroundImage: 'linear-gradient(to right, black, #FFB834)' } }
          xs={ 12 }
          md={ 12 }
          xl={ 3 }
        >
          <Paper
            sx={ {
              m: 4,
              textAlign: 'center',
            } }
          >
            <Button
              component={ Link }
              to="/"
              type="button"
              variant="contained"
              color="success"
              size="large"
              data-testid="btn-go-home"
              sx={ { m: 2 } }
            >
              { rankingArray.length > 0 ? 'Play Again' : 'Play' }
            </Button>
          </Paper>
        </Grid>
        <Grid
          item
          sx={ {
            backgroundColor: '#FFB834', minHeight: '50vw' } }
          alignContent="center"
          xs={ 12 }
          md={ 12 }
          xl={ 6 }
        >
          <RankingTable />
        </Grid>
        <Grid
          item
          sx={ { backgroundImage: 'linear-gradient(to left, black, #FFB834)' } }
          xs={ 12 }
          md={ 12 }
          xl={ 3 }
        >
          <Paper sx={ { m: 4, p: 1 } }>
            <Box
              sx={ {
                backgroundColor: 'black',
                textAlign: 'center',
                listStyle: 'none',
                fontWeight: 'bold',
                color: 'white' } }
            >
              LAST GAME DATA
            </Box>
            { rankingArray.length > 0
              ? (<LastGameDisplayer lastGameData={ lastGameData } />)
              : 'No match found' }
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// COLOCAR UMA LIMITAÇÃO DE PLAYER POR PÁGINAS E A POSSIBILIDADE DE VER OS QUE ESTÃO ALÉM DA PRIMEIRA PÁGINA
