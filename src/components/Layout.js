import React, { Component } from 'react';

import PlayerHand from  './PlayerHand';

export default class Layout extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">Black Jack</h1>

        <PlayerHand />

      </div>
    )
  }
}
