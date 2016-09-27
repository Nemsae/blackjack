import React, { Component } from 'react';

import PlayerHand from  './PlayerHand';
import DealerHand from  './DealerHand';
import CardActions from '../actions/CardActions'
import CardStores from '../stores/CardStores'

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: CardStores.getMessage(),
    }

    this._newGame = this._newGame.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentWillMount() {
    CardStores.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStores.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      message: .getMessage(),
    })
  }

  _newGame() {
    CardActions.reset();
    CardActions.newGame();
    CardActions.draw();
    CardActions.draw();
    CardActions.dealerDrawBlank();
    CardActions.dealerDraw();
    CardActions.totalPlayer();
    CardActions.totalDealer();
    CardActions.bustCheck();
  }

  render() {
    const { message } = this.state;
    return (
      <div className="container text-center">
        <h1 className="text-center">Black Jack</h1>
        <div className='col-xs-12 text-center'>
          <button onClick={this._newGame}>New Game</button>
        </div>
        <div className="col-xs-12 text-center message">
          <h2>{ message }</h2>
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
