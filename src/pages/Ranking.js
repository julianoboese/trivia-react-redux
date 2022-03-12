import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import rankingStyles from './RankingStyle';
import { getStoredRankig } from '../services/localStorageAPI';

const styles = rankingStyles;

export default class Ranking extends Component {
  renderRanking = () => {
    const rankingArray = getStoredRankig();
    const lastPodium = 2;
    const podium = ['firstBackground', 'secondBackground', 'thirdBackground'];
    return rankingArray.map(({ name, score, picture }, index) => {
      const isPodium = index <= lastPodium;
      return (
        <Grid
          container
          item
          key={ `${name}${index}` }
          direction="row"
        >
          <Grid
            item
            md="3"
            xl="4"
            sx={ (isPodium ? styles[podium[index]] : styles.defaultBackground) }
          />
          <Grid
            item
            xs="12"
            md="6"
            xl="4"
            sx={ { margin: '50px 0' } }
          >
            <Card sx={ { margin: '0 20px', width: 'auto' } }>
              <CardMedia
                component="img"
                alt={ `${index + 1} place player: ${name}` }
                data-testid="header-profile-picture"
                sx={ { margin: 'auto', maxWidth: '100px' } }
                src={ picture }
              />
              <CardContent>
                <Typography align="center">
                  {`${index + 1} lugar`}
                </Typography>
                <Typography
                  align="center"
                  data-testid={ `player-name-${index}` }
                >
                  { name }
                </Typography>
                <Typography
                  align="center"
                  data-testid={ `player-score-${index}` }
                >
                  { `${score} pontos` }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            md="3"
            xl="4"
            sx={ (isPodium ? styles[podium[index]] : styles.defaultBackground) }
          />
        </Grid>
      );
    });
  }

  render() {
    const { renderRanking } = this;
    return (
      <>
        <Grid sx={ { backgroundColor: '#F3CE84' } }>
          <Typography
            align="center"
            component="h1"
            variant="h1"
            data-testid="ranking-title"
            paragraph
            sx={ { backgroundColor: 'rgb(211, 211, 211)' } }
          >
            Ranking:
          </Typography>
          <Link to="/">
            <button type="button" data-testid="btn-go-home">Play Again</button>
          </Link>
        </Grid>
        <Grid
          container
          rowSpacing="20"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          { renderRanking() }
        </Grid>
      </>
    );
  }
}
