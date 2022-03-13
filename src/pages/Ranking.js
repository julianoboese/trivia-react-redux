import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getStoredRankig } from '../services/localStorageAPI';
import noPodiumImg from '../mario-coin-unscreen.gif';
import rankingStyles from './RankingStyle';

const sStyles = rankingStyles;
const LAST_PODIUM = 2;
const podium = [sStyles.firstPlace, sStyles.secondPlace,
  sStyles.thirdPlace, sStyles.default];

export default class Ranking extends Component {
  renderRanking = () => {
    const rankingArray = getStoredRankig();
    return rankingArray.map(({ name, score, picture }, index) => {
      const isPodium = index <= LAST_PODIUM;
      const currStyle = isPodium ? podium[index] : podium[3];
      return (
        <TableRow key={ `${name}${index}` }>
          {/* <TableCell align="center" sx={ { width: '33.5%' } } /> */}
          <TableCell align="center">
            <img
              alt={ `${index + 1} place icon` }
              src={ currStyle.imageSrc }
              style={ currStyle.img }
            />
          </TableCell>
          <TableCell align="center">
            <img
              alt={ `${index + 1} place player: ${name} avatar` }
              src={ picture }
              style={ { maxWidth: '100%' } }
            />
          </TableCell>
          <TableCell align="center">
            {`${index + 1} lugar`}
          </TableCell>
          <TableCell
            align="center"
            data-testid={ `player-name-${index}` }
          >
            { name }
          </TableCell>
          <TableCell
            align="center"
            data-testid={ `player-score-${index}` }
          >
            { `${score} pontos` }
          </TableCell>
          {/* <TableCell align="center" sx={ { width: '33.5%' } } /> */}
        </TableRow>
      );
    });
  }

  render() {
    const { renderRanking } = this;
    return (
      <Grid container direction="row" alignContent="center">
        <Grid
          item
          sx={ { backgroundImage: 'linear-gradient(to top, black, #FFB834)', border: '1px solid' } }
          alignContent="center"
        >
          <Typography
            align="center"
            component="h1"
            variant="h1"
            data-testid="ranking-title"
            paragraph
            // sx={ { backgroundColor: 'rgb(211, 211, 211)' } }
          >
            RANKING
          </Typography>
          <nav style={ { backgroundImage: 'linear-gradient(to right, black, rgb(0,0,0))', textAlign: 'center' } }>
            <Link to="/">
              <button type="button" data-testid="btn-go-home">Play Again</button>
            </Link>
          </nav>
        </Grid>
        <Table
          aria-label="Ranking"
          sx={ { maxWidth: '78.9%',
          // !!!!!!!!!!!!!! CORRIGIR ESSE MAX WIDTH COM GRID!!!
            backgroundImage: 'linear-gradient(to left, #FFB834, black)',
          } }
        >
          <TableHead>
            <TableRow>
              {/* <TableCell align="center" sx={ { width: '33.5%' } } /> */}
              <TableCell align="center" sx={ { width: '5%' } } />
              <TableCell align="center" sx={ { width: '8%' } }> Avatar </TableCell>
              <TableCell align="center" sx={ { width: '10%' } }> Posição </TableCell>
              <TableCell align="center" sx={ { width: '10%' } }> Nome </TableCell>
              <TableCell align="center" sx={ { width: '10%' } }> Pontuação </TableCell>
              {/* <TableCell align="center" sx={ { width: '33.5' } } /> */}
            </TableRow>
          </TableHead>
          <TableBody>
            { renderRanking() }
          </TableBody>
        </Table>
      </Grid>
    );
  }
}
