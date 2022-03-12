import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getStoredRankig } from '../services/localStorageAPI';

export default class Ranking extends Component {
  renderRanking = () => {
    const rankingArray = getStoredRankig();
    const lastPodium = 3;
    return rankingArray.map(({ name, score, picture }, index) => (
      <>
        <Grid xs="0" md="3" xl="4.9">
          <CardMedia
            component="video"
            src="../star-unscreen.gif"
          />
        </Grid>
        <Grid
          item
          key={ `${name}${index}` }
          sx={ { maxWidth: 350 } }
          xs="12"
          md="6"
          xl="3"
        >
          <Card sx={ { maxWidth: 350 } }>
            <CardMedia
              component="img"
              alt={ `${index + 1} place player: ${name}` }
              data-testid="header-profile-picture"
              sx={ { maxWidth: 100, margin: 'auto' } }
              src={ picture }
            />
            <CardContent>
              <Typography align="center">
                {`Posição: ${index + 1} ${index < lastPodium ? 'lugar' : ''}`}
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
                { `Pontuação: ${score}` }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs="0" md="3" xl="4" />
      </>
    ));
  }

  render() {
    const { renderRanking } = this;
    return (
      <Box sx={ { backgroundColor: 'black' } }>
        <header>
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
        </header>
        <Grid container rowSpacing="8" columnSpacing="20">
          { renderRanking() }
        </Grid>
      </Box>
    );
  }
}
