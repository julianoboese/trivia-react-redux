import React, { Component } from 'react';
import { Avatar, Stack, Paper, Table, TableBody, TableCell, Divider,
  TableContainer, TableHead, TableRow, Box, Typography, Slider } from '@mui/material';
import { getStoredRanking } from '../services/localStorageAPI';
import rankingStyles from '../pages/rankingStyle';

const sStyles = rankingStyles;
const { background2, background1 } = sStyles.tableRow;
const LAST_PODIUM = 2;
const podium = [sStyles.firstPlace, sStyles.secondPlace,
  sStyles.thirdPlace, sStyles.default];

const MAX_TIMER = 60;
const MIN_TIMER = 5;
const MAX_QUESTIONS = 50;
const MIN_QUESTIONS = 1;

export default class RankingTable extends Component {
  state = {
    questionsQuantityFilter: 5,
    timerFilter: 30,
    // categoryFilter: '',
    // difficultyFilter: '',
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderRankingBody = () => {
    const { questionsQuantityFilter, timerFilter,
      // categoryFilter, difficultyFilter
    } = this.state;
    const rankingArray = getStoredRanking() || [];
    const filteredRanking = rankingArray
      .filter(({ configs: { initialTimer } }) => initialTimer === timerFilter)
      .filter(({ configs: { quantity } }) => quantity === questionsQuantityFilter);
    const lastMatch = [...rankingArray]
      .sort(({ date: { id: a } }, { date: { id: b } }) => b - a)[0];
    if (rankingArray.length > 0) {
      return filteredRanking.map(({ name, score, picture, date }, index) => {
        const isPodium = index <= LAST_PODIUM;
        const striped = (index % 2);
        const rowStyle = striped ? background2 : background1;
        const cellStyle = rowStyle.TableCell;
        const currStyle = isPodium ? podium[index] : podium[3];
        const highlighter = lastMatch.date.id === date.id
          ? ['6', '#BF0005']
          : [0, ''];
        return (
          <TableRow
            key={ `${name}${index}` }
            sx={ { ...rowStyle,
              borderTop: +highlighter[0],
              borderBottom: +highlighter[0],
              borderBlockColor: highlighter[1] } }
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
    } return 'No match found';
  }

  renderTableHeadData = () => {
    const columns = ['Ranking', 'Avatar', 'Player', 'Score'];
    return (
      <TableHead sx={ { height: '80px' } }>
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
      </TableHead>
    );
  }

  render() {
    const { questionsQuantityFilter, timerFilter } = this.state;
    const { handleChange } = this;
    return (
      <TableContainer component={ Paper } elevation={ 12 } sx={ { mt: 4, p: 1 } }>
        <Stack
          direction="row"
          spacing={ 8 }
          divider={ <Divider orientation="vertical" flexItem /> }
        >
          <Typography component="p" sx={ { width: '5%' } }>Filter By:</Typography>
          <Box sx={ { width: 300, display: 'inline-block' } }>
            <Typography id="input-slider" gutterBottom>
              Time
            </Typography>
            <Slider
              aria-label={ `slider type input to select the displayed games in the ranking
              based on the interval in seconds between questions` }
              name="timerFilter"
              value={ timerFilter }
              valueLabelDisplay="auto"
              step={ 5 }
              marks
              min={ MIN_TIMER }
              max={ MAX_TIMER }
              onChange={ handleChange }
              sx={ { color: 'black' } }
            />
          </Box>
          <Box sx={ { width: 300, display: 'inline-block' } }>
            <Typography id="input-slider" gutterBottom>
              Number of questions
            </Typography>
            <Slider
              aria-label={ `slider type input to select the displayed games in the ranking
              based on the quantity of questions` }
              name="questionsQuantityFilter"
              value={ questionsQuantityFilter }
              valueLabelDisplay="auto"
              min={ MIN_QUESTIONS }
              max={ MAX_QUESTIONS }
              onChange={ handleChange }
              sx={ { color: '#FFB834' } }
            />
          </Box>
        </Stack>
        <Table>
          { this.renderTableHeadData() }
          <TableBody>
            { this.renderRankingBody() }
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
      </TableContainer>
    );
  }
}
