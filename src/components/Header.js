import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const hash = md5(email).toString();

    return (
      <div className="playerInfo">
        <div className="pictureContainer">
          <img alt="player" data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } />
        </div>
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">0</span>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
