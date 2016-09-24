import React, { Component } from 'react';

import CardStores from '../stores/CardStores';
import CardActions from '../actions/CardActions';

export default class PlayerHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: CardStores.getAll(),
      playerTotal: 0,
    }

    this._onChange = this._onChange.bind(this);
    this._hit = this._hit.bind(this);
  }

  componentWillMount() {
    CardStores.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStores.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      hand: CardStores.getAll(),
    })
  }

  _hit() {
    CardActions.draw();
    this._convertCards();
  }

  _convertCards() {
    let handArray = this.state.hand;
    console.log("Player's Hand: ",handArray);
    let cardTotal = 0;

    for (let i=0;i<handArray.length;i++) {
      let card = handArray[i];
      console.log('cardObject: ',card);
      console.log('suit of each: ',card.suit);
      console.log('value of each: ',card.value);
      if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
        cardTotal += 10;
      } else if (card.value === 'A') {
        //trigger function _ace(); _ace() will return a number
        // num = _ace();
        // cardTotal += num;
        cardTotal += 11;
      } else {
        cardTotal += card.value;
      }
    }

    this.setState({
      playerTotal: cardTotal,
    })

  }

  _ace() {
    
  }

//Stay will trigger Dealer to draw
  // _stay() {
  //
  // }

  render() {
    const { hand, playerTotal } = this.state;
    return (
      <div className="container">
        <div className="col-xs-6">
          <h3>Player's Hand</h3>
          { hand.map(card => (
            // console.log('card',card);
            // console.log('card suit',card.suit);
            // console.log('card value',card.value);

              <div>
                <h4>{card.value} of {card.suit}</h4>
              </div>

          ))}
          <h4>{ playerTotal }</h4>
          <button onClick={this._hit}>Hit!</button>
          <button onClick={this._stay}>Stay!</button>
        </div>
      </div>
      //<DealerHand>
    )
  }

}
