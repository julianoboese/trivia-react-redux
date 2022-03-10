import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default class Feedback extends Component {
  render() {
    return (
      <>
        <Header />
        <span data-testid="feedback-text">Xablau</span>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Play Again</button>
        </Link>
      </>
    );
  }
}
