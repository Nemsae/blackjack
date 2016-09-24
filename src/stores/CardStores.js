import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';

let _cards = ['c2','c3','c4','c5','c6','c7','c8','c9','c10','cJ','cQ','cK','cA','d2','d3','d4','d5','d6','d7','d8','d9','d10','dJ','dQ','dK','dA','h2','h3','h4','h5','h6','h7','h8','h9','h10','hJ','hQ','hK','hA','s2','s3','s4','s5','s6','s7','s8','s9','s10','sJ','sQ','sK','sA'];
let _playerCards = [];


class CardStores extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      console.log('action: ',action);
      switch(action.type) {
        case 'CARD_GRAB':
          let shuffledCards = lodash.shuffle(_cards);
          let newCard = shuffledCards.pop();
          _playerCards.push(newCard);
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(callback) {
    this.on('CHANGE', callback);
  }

  stopListening(callback) {
    this.removeListener('CHANGE', callback);
  }

  getAll() {
    return _playerCards;
  }

}

export default new CardStores();
