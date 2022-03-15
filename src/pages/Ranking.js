import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Avatar, Box, Button, Paper, Table,
  TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getStoredRanking } from '../services/localStorageAPI';
import rankingStyles from './RankingStyle';
import triviaLogo from '../assets/images/trivia-logo.gif';

const sStyles = rankingStyles;
const { background2, background1 } = sStyles.tableRow;
const LAST_PODIUM = 2;
const podium = [sStyles.firstPlace, sStyles.secondPlace,
  sStyles.thirdPlace, sStyles.default];

export default class Ranking extends Component {
  renderRanking = () => {
    const rankingArray = getStoredRanking();
    return rankingArray.map(({ name, score, picture }, index) => {
      const isPodium = index <= LAST_PODIUM;
      const striped = (index % 2);
      const rowStyle = striped ? background2 : background1;
      const cellStyle = rowStyle.TableCell;
      const currStyle = isPodium ? podium[index] : podium[3];
      return (
        <TableRow
          key={ `${name}${index}` }
          sx={ rowStyle }
        >
          <TableCell align="center" sx={ cellStyle }>
            <img
              alt={ `${index + 1} place icon` }
              src={ currStyle.imageSrc }
              style={ currStyle.img }
            />
            <p>{`${index + 1}º place`}</p>
          </TableCell>
          <TableCell align="center" sx={ cellStyle }>
            <Avatar
              alt={ `${index + 1} place player: ${name} avatar` }
              src={ picture }
              style={ { width: '3.5em', margin: 'auto', height: '3.5em' } }
              align="center"
            />
          </TableCell>
          <TableCell
            align="center"
            sx={ cellStyle }
            data-testid={ `player-name-${index}` }
          >
            { name }
          </TableCell>
          <TableCell
            align="center"
            sx={ cellStyle }
            data-testid={ `player-score-${index}` }
          >
            { `${score} points` }
          </TableCell>
        </TableRow>
      );
    });
  }

  renderTableHeadData = () => {
    const columns = ['Ranking', 'Avatar', 'Player', 'Score'];
    return (
      <TableRow
        sx={ {
          backgroundColor: 'black',
          padding: '5px',
        } }
      >
        {columns.map((column, index) => (
          <TableCell
            key={ index }
            align="center"
            sx={ { width: '10%',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.5em' } }
          >
            {column}
          </TableCell>))}
      </TableRow>
    );
  }

  render() {
    const { renderRanking, renderTableHeadData } = this;
    const rankingArray = getStoredRanking();
    // const FIVE = 5;
    // const TEN = 10;
    // const TWENTY = 20;
    return (
      <Grid
        container
        direction="row"
        alignItems="stretch"
        sx={ { backgroundColor: 'black' } }
      >
        <Grid
          item
          xs={ 2 }
        >
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
        </Grid>
        <Grid
          item
          xs={ 8 }
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
              Play Again
            </Button>
          </Paper>
        </Grid>
        <Grid
          item
          sx={ {
            backgroundColor: '#FFB834' } }
          alignContent="center"
          xs={ 12 }
          md={ 12 }
          xl={ 6 }
        >
          <Paper elevation={ 12 } sx={ { mt: 4, p: 1 } }>
            <Table
              aria-label="Ranking"
            >
              <TableHead sx={ { height: '80px' } }>
                { renderTableHeadData() }
              </TableHead>
              <TableBody>
                { rankingArray ? renderRanking() : 'Nenhuma partida registrada' }
                { /* ajustar a mensagem do ranking antes de começar uma partida */ }
              </TableBody>
              {/* <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={ [FIVE, TEN, TWENTY] }
                    colSpan={ 3 }
                  />
                </TableRow>
              </TableFooter> */}
            </Table>
          </Paper>
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
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

// COLOCAR UMA LIMITAÇÃO DE PLAYER POR PÁGINAS E A POSSIBILIDADE DE VER OS QUE ESTÃO ALÉM DA PRIMEIRA PÁGINA
