import React, { Component } from 'react';

import CardStores from '../stores/CardStores';
import CardActions from '../actions/CardActions';

export default class PlayerHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: CardStores.getAll(),
      playerTotal: 0,
      message: '',
    }

    this._onChangeDeck = this._onChangeDeck.bind(this);
    this._hit = this._hit.bind(this);
    // this._ace = this._ace.bind(this);
  }

  componentWillMount() {
    CardStores.startListening(this._onChangeDeck);
  }

  componentWillUnmount() {
    CardStores.stopListening(this._onChangeDeck);
  }

  _onChangeDeck() {
    this.setState({
      hand: CardStores.getAll(),
    })
  }

  _hit() {
    CardActions.draw();
    this._countCards();
  }

  _countCards() {
    let { hand, message } = this.state;
    let handArray = this.state.hand;
    console.log("Player's Hand: ",handArray);
    var cardTotal = 0;
    var aceCount = 0;
    for (let i=0;i<handArray.length;i++) {
      let card = handArray[i];

      if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
        if (cardTotal+10>21 && aceCount > 0) {
          cardTotal -= 10;
          aceCount--;
          cardTotal += 10;
        } else {
          cardTotal += 10;
        }
      } else if (card.value === 'A') {
        aceCount++;
        if(cardTotal>10) {
          aceCount--;
          cardTotal += 1;
        } else {
          cardTotal += 11;
        }
      } else {
        if (cardTotal+card.value>21 && aceCount > 0) {
          cardTotal -= 10;
          aceCount--;
          cardTotal += card.value;
        } else {
          cardTotal += card.value;
        }
      }
    }

    if(cardTotal === 21) {
      this.setState({
        message: 'BLACK JACKED!!!',
      })
    } else if (cardTotal > 21) {
      this.setState({
        message: 'BUST :('
      })
    }

    this.setState({
      playerTotal: cardTotal,
      // aceCount,
    })
  }


//Stay will trigger Dealer to draw
  // _stay() {
  //
  // }

  render() {
    const { hand, playerTotal, message } = this.state;
    return (
      <div className="container">
        <div className="col-xs-6">
          <h3>Player's Hand</h3>

          { hand.map(card => (
              <div>
                <h4>{card.value} of {card.suit}</h4>
              </div>
          ))}

          <h4>{ playerTotal }</h4>
          <button onClick={this._hit}>Hit!</button>
          <button onClick={this._stay}>Stay!</button>
          <h1>{ message }</h1>
        </div>
      </div>
      //<DealerHand>
    )
  }

}
