import React, { Component } from 'react';

import CardStores from '../stores/CardStores';
import CardActions from '../actions/CardActions';

export default class DealerHand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealersHand: CardStores.getDealerHand(),
      dealersTotal: CardStores.getDealerTotal(),
    }

    this._onChangeDealerHand = this._onChangeDealerHand.bind(this);
  }

  componentWillMount() {
    CardStores.startListening(this._onChangeDealerHand);
  }

  componentWillUnmount() {
    CardStores.stopListening(this._onChangeDealerHand);
  }

  _onChangeDealerHand() {
    this.setState({
      dealersHand: CardStores.getDealerHand(),
      dealersTotal: CardStores.getDealerTotal(),
    })
  }

  render() {
    const { dealersHand, dealersTotal } = this.state;
    return (
      <div className="container">
        <div className="col-xs-6">
          <h3>Dealer's Hand: { dealersTotal }</h3>

          { dealersHand.map((card, i) => (
              <div key={i} className='left'>
                {/* <h4>{card.value} of {card.suit}</h4> */}
                <h4 className='card' >{card.img}</h4>
              </div>
          ))}

        </div>
      </div>
    )
  }

}
