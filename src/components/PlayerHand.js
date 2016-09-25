import React, { Component } from 'react';

import CardStores from '../stores/CardStores';
import CardActions from '../actions/CardActions';

export default class PlayerHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: CardStores.getPlayerHand(),
      playerTotal: CardStores.getPlayerTotal(),
      message: CardStores.getMessage(),
    }

    this._onChangePlayerHand = this._onChangePlayerHand.bind(this);
    this._hit = this._hit.bind(this);
    this._stay = this._stay.bind(this);
  }

  componentWillMount() {
    CardStores.startListening(this._onChangePlayerHand);
  }

  componentWillUnmount() {
    CardStores.stopListening(this._onChangePlayerHand);
  }

  _onChangePlayerHand() {
    this.setState({
      hand: CardStores.getPlayerHand(),
      message: CardStores.getMessage(),
      playerTotal: CardStores.getPlayerTotal(),
    })
  }

  _hit() {
    CardActions.draw();
    CardActions.totalPlayer();
    CardActions.bustCheck();
  }

  _stay() {
    CardActions.stayCheck();
    CardActions.winnerCheck();
  }

  render() {
    const { hand, playerTotal, message } = this.state;
    return (
      <div className="container">
        <div className="col-xs-6">
          <h3>Player's Hand: { playerTotal }</h3>

          { hand.map((card, i) => (
              <div key={i}>
                <h4>{card.value} of {card.suit}</h4>
              </div>
          ))}

          <button onClick={this._hit}>Hit!</button>
          <button onClick={this._stay}>Stay!</button>
          <h1>{ message }</h1>
        </div>
      </div>
    )
  }

}
