import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';

let _cards = [{suit: 'Clubs', value: 2, url: ''},{suit: 'Clubs', value: 3, url: ''},{suit: 'Clubs', value: 4, url: ''},{suit: 'Clubs', value: 5, url: ''},{suit: 'Clubs', value: 6, url: ''},{suit: 'Clubs', value: 7, url: ''},{suit: 'Clubs', value: 8, url: ''},{suit: 'Clubs', value: 9, url: ''},{suit: 'Clubs', value: 10, url: ''},{suit: 'Clubs', value: 'J', url: ''},{suit: 'Clubs', value: 'Q', url: ''},{suit: 'Clubs', value: 'K', url: ''},{suit: 'Clubs', value: 'A', url: ''},{suit: 'Diamonds', value: 2, url: ''},{suit: 'Diamonds', value: 3, url: ''},{suit: 'Diamonds', value: 4, url: ''},{suit: 'Diamonds', value: 5, url: ''},{suit: 'Diamonds', value: 6, url: ''},{suit: 'Diamonds', value: 7, url: ''},{suit: 'Diamonds', value: 8, url: ''},{suit: 'Diamonds', value: 9, url: ''},{suit: 'Diamonds', value: 10, url: ''},{suit: 'Diamonds', value: 'J', url: ''},{suit: 'Diamonds', value: 'Q', url: ''},{suit: 'Diamonds', value: 'K', url: ''},{suit: 'Diamonds', value: 'A', url: ''},{suit: 'Hearts', value: 2, url: ''},{suit: 'Hearts', value: 3, url: ''},{suit: 'Hearts', value: 4, url: ''},{suit: 'Hearts', value: 5, url: ''},{suit: 'Hearts', value: 6, url: ''},{suit: 'Hearts', value: 7, url: ''},{suit: 'Hearts', value: 8, url: ''},{suit: 'Hearts', value: 9, url: ''},{suit: 'Hearts', value: 10, url: ''},{suit: 'Hearts', value: 'J', url: ''},{suit: 'Hearts', value: 'Q', url: ''},{suit: 'Hearts', value: 'K', url: ''},{suit: 'Hearts', value: 'A', url: ''},{suit: 'Spades', value: 2, url: ''},{suit: 'Spades', value: 3, url: ''},{suit: 'Spades', value: 4, url: ''},{suit: 'Spades', value: 5, url: ''},{suit: 'Spades', value: 6, url: ''},{suit: 'Spades', value: 7, url: ''},{suit: 'Spades', value: 8, url: ''},{suit: 'Spades', value: 9, url: ''},{suit: 'Spades', value: 10, url: ''},{suit: 'Spades', value: 'J', url: ''},{suit: 'Spades', value: 'Q', url: ''},{suit: 'Spades', value: 'K', url: ''},{suit: 'Spades', value: 'A', url: ''}];
let _playerCards = [];


class CardStores extends EventEmitter {
  constructor() {
    super();


    // this.token = AppDispatcher.register(action => {
    AppDispatcher.register(action => {
      console.log('action: ',action);
      switch(action.type) {
        case 'CARD_GRAB':
          // console.log('cards: ',_cards);
          // let shuffledCards = lodash.shuffle(_cards);
          // console.log('shuffledCards: ',typeof(shuffledCards))
          let newCard = _cards.pop();
          console.log('newCard: ',newCard);
          // console.log('length: ',shuffledCards.length)
          _playerCards.push(newCard);
          this.emit('CHANGE');
          break;
        case 'SHUFFLE':
          _cards = lodash.shuffle(_cards);
          console.log('shuffled: ',_cards)
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
