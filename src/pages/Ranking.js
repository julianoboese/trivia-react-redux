import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Avatar, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getStoredRankig } from '../services/localStorageAPI';
import rankingStyles from './RankingStyle';

const sStyles = rankingStyles;
const { background2, background1 } = sStyles.tableRow;
const LAST_PODIUM = 2;
const podium = [sStyles.firstPlace, sStyles.secondPlace,
  sStyles.thirdPlace, sStyles.default];

export default class Ranking extends Component {
  renderRanking = () => {
    const rankingArray = getStoredRankig();
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
          {/* <TableCell align="center" sx={ { width: '33.5%' } } /> */}
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
              style={ { width: '4em', margin: 'auto', borderRadius: '100%', height: '4em' } }
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
          {/* <TableCell align="center" sx={ { width: '33.5%' } } /> */}
        </TableRow>
      );
    });
  }

  renderTableHeadData = () => (
    <TableRow
      sx={ {
        backgroundImage: 'linear-gradient( black, black)',
        padding: '5px',
      } }
    >
      {/* <TableCell align="center" sx={ { width: '33.5%' } } /> */}
      <TableCell
        align="center"
        sx={ { width: '8%', color: 'white', weight: 'bold', padding: '5px',
        } }
      >
        Ranking
      </TableCell>
      <TableCell
        align="center"
        sx={ { width: '8%', color: 'white', weight: 'bold',
        } }
      >
        Avatar
      </TableCell>
      <TableCell
        align="center"
        sx={ { width: '10%', color: 'white', weight: 'bold',
        } }
      >
        Player
      </TableCell>
      <TableCell
        align="center"
        sx={ { width: '10%', color: 'white', weight: 'bold',
        } }
      >
        Score
      </TableCell>
      {/* <TableCell align="center" sx={ { width: '33.5' } } /> */}
    </TableRow>
  )

  render() {
    const { renderRanking, renderTableHeadData } = this;
    const rankingArray = getStoredRankig();
    return (
      <Grid
        container
        direction="row"
        alignItems="stretch"
        sx={ { height: '100vh', backgroundImage: 'linear-gradient(black, black)' } }
      >
        <Grid
          item
          sx={ { backgroundImage: 'linear-gradient(to top, black, #FFB834)',
            border: '1px solid',
          } }
          xs={ 12 }
          md={ 12 }
          xl={ 3 }
        >
          <Typography
            align="center"
            component="h1"
            variant="h1"
            data-testid="ranking-title"
            paragraph
            sx={ {
              backgroundColor: 'black',
              fontWeight: 'bold',
              color: 'white',
            } }
          >
            RANKING
          </Typography>
          <nav
            style={ {
              backgroundColor: 'black',
              textAlign: 'center' } }
          >
            <Link to="/">
              <button type="button" data-testid="btn-go-home">Play Again</button>
            </Link>
          </nav>
        </Grid>
        <Grid
          item
          sx={ { backgroundColor: 'black',
            border: '1px solid' } }
          alignContent="center"
          xs={ 12 }
          md={ 12 }
          xl={ 6 }
        >
          <Table
            aria-label="Ranking"
            sx={ {
              backgroundImage: 'linear-gradient(to left, #FFB834, black)',
            } }
          >
            <TableHead>
              { renderTableHeadData() }
            </TableHead>
            <TableBody>
              { rankingArray ? renderRanking() : 'Nenhuma partida registrada' } { /* ajustar a mensage do rnaking antes de começar uma partida */ }
            </TableBody>
          </Table>
        </Grid>
        <Grid
          item
          sx={ { backgroundImage: 'linear-gradient(to top, black, #FFB834)',
            border: '1px solid',
          } }
          xs={ 12 }
          md={ 12 }
          xl={ 3 }
        >
          <Typography
            align="center"
            component="h1"
            variant="h1"
            data-testid="ranking-title"
            paragraph
            sx={ {
              backgroundColor: 'black',
              fontWeight: 'bold',
              color: 'white',
            } }
          >
            RANKING
          </Typography>
          <li
            style={ {
              backgroundColor: 'black',
              textAlign: 'center' } }
          />
        </Grid>
      </Grid>
    );
  }
}
