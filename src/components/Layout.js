import React, { Component } from 'react';

import PlayerHand from  './PlayerHand';
import DealerHand from  './DealerHand';
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
      <div className="container text-center">
        <h1 className="text-center">Black Jack</h1>
        <div className='col-xs-12 text-center'>
          <button onClick={this._shuffle()}>Start/Shuffle</button>
        </div>
        <div className="col-xs-6">
          <PlayerHand />
        </div>
        <div className="col-xs-6">
          <DealerHand />
        </div>

      </div>
    )
  }
}
