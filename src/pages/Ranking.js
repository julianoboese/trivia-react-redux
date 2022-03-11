import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getStoredRankig } from '../services/localStorageAPI';

export default class Ranking extends Component {
  renderRanking = () => {
    const rankingArray = getStoredRankig();
    const lastPodium = 3;
    return rankingArray.map(({ name, score, picture }, index) => (
      <div key={ `${name}${index}` }>
        <img alt="player" data-testid="header-profile-picture" src={ picture } />
        <p>
          {`Position: ${index + 1} ${index < lastPodium ? 'place' : ''}`}
        </p>
        <p data-testid={ `player-name-${index}` }>{ name }</p>
        <p data-testid={ `player-score-${index}` }>{ score }</p>
      </div>
    ));
  }

  render() {
    const { renderRanking } = this;
    return (
      <>
        <span data-testid="ranking-title">Ranking</span>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Play Again</button>
        </Link>
        { renderRanking() }
      </>
    );
  }
}
