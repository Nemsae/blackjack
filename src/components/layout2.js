import React, { Component } from 'react';

import PlayerHand from  './PlayerHand';
import DealerHand from  './DealerHand';
import CardActions from '../actions/CardActions'
import CardStores from '../stores/CardStores'

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: CardStores.getPlayerHand(),
      total: CardStores.getPlayerTotal(),
    }

    this._shuffle = this._shuffle.bind(this);
    this._onChangePlayerHand = this._onChangePlayerHand.bind(this);
    this._onChangePlayerTotal = this._onChangePlayerTotal.bind(this);
  }

  componentWillMount() {
    CardStores.startListening(this._onChangePlayerHand);
    CardStores.startListening(this._onChangePlayerTotal);
  }

  componentWillUnmount() {
    CardStores.stopListening(this._onChangePlayerHand);
    CardStores.stopListening(this._onChangePlayerTotal);
  }

  _onChangePlayerHand() {
    this.setState({
      hand: CardStores.getPlayerHand(),
    })
  }

  _onChangePlayerTotal() {
    this.setState({
      playerTotal: CardStores.getPlayerTotal(),
    })
  }

  _shuffle() {
    CardActions.shuffle();
    CardActions.draw();
    CardActions.draw();
    CardActions.totalPlayer();
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
