import React, { Component } from 'react';

import CardStores from '../stores/CardStores';
import CardActions from '../actions/CardActions';

export default class PlayerHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: CardStores.getAll(),
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
    // for (let i=0;i<handArray.length;i++) {
    //   let cardObject = handArray[0][0];
    //   console.log('cardObject: ',cardObject);
    //   console.log('suit of each: ',cardObject.suit);
    //   console.log('value of each: ',cardObject.value);
    // }

    // for (let i=0;i<handArray.length;i++) {
    //   let card = handArray[i];
    //   console.log('card: ',card);
    //   let suit = card.slice(0,1);
    //   console.log('suit: ',suit);
    //   let number = card.slice(1);
    //   console.log('number: ',number)
    // }


    // let cardString = (this.state.hand).toString();
    // console.log(cardString);
    //
    // // if (number === )
    // console.log('number: ',number);
    // let suit = cardString.slice(0,1);
    // console.log('suit: ',suit);


  }

//Stay will trigger Dealer to draw
  // _stay() {
  //
  // }

  render() {
    const { hand } = this.state;
    return (
      <div className="container">
        <div className="col-xs-6">
          <h3>Player's Hand</h3>
          { hand.map(card => {
            <div>
              <h4>{card.suit}</h4>
              <h4>{card.value}</h4>
            </div>
          }) }
          {/* <h3>{ hand }</h3> */}
          <button onClick={this._hit}>Hit!</button>
          <button onClick={this._stay}>Stay!</button>
        </div>
      </div>
      //<DealerHand>
    )
  }

}
