import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  render() {
    return (
      <>
        <span data-testid="ranking-title">Ranking</span>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Play Again</button>
        </Link>
      </>
    );
  }
}
