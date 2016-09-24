import React, { Component } from 'react';

import PlayerHand from  './PlayerHand';
import CardActions from '../actions/CardActions'
import CardStores from '../stores/CardStores'

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: CardStores.getAll(),
    }

    this._shuffle = this._shuffle.bind(this);
  }

  _shuffle() {
    CardActions.shuffle();
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Black Jack</h1>
        <button onClick={this._shuffle()}>Start/Shuffle</button>
        <PlayerHand />

      </div>
    )
  }
}
