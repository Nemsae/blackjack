import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';

let _cards = [{suit: 'Clubs', value: 2, url: ''},{suit: 'Clubs', value: 3, url: ''},{suit: 'Clubs', value: 4, url: ''},{suit: 'Clubs', value: 5, url: ''},{suit: 'Clubs', value: 6, url: ''},{suit: 'Clubs', value: 7, url: ''},{suit: 'Clubs', value: 8, url: ''},{suit: 'Clubs', value: 9, url: ''},{suit: 'Clubs', value: 10, url: ''},{suit: 'Clubs', value: 'J', url: ''},{suit: 'Clubs', value: 'Q', url: ''},{suit: 'Clubs', value: 'K', url: ''},{suit: 'Clubs', value: 'A', url: ''},{suit: 'Diamonds', value: 2, url: ''},{suit: 'Diamonds', value: 3, url: ''},{suit: 'Diamonds', value: 4, url: ''},{suit: 'Diamonds', value: 5, url: ''},{suit: 'Diamonds', value: 6, url: ''},{suit: 'Diamonds', value: 7, url: ''},{suit: 'Diamonds', value: 8, url: ''},{suit: 'Diamonds', value: 9, url: ''},{suit: 'Diamonds', value: 10, url: ''},{suit: 'Diamonds', value: 'J', url: ''},{suit: 'Diamonds', value: 'Q', url: ''},{suit: 'Diamonds', value: 'K', url: ''},{suit: 'Diamonds', value: 'A', url: ''},{suit: 'Hearts', value: 2, url: ''},{suit: 'Hearts', value: 3, url: ''},{suit: 'Hearts', value: 4, url: ''},{suit: 'Hearts', value: 5, url: ''},{suit: 'Hearts', value: 6, url: ''},{suit: 'Hearts', value: 7, url: ''},{suit: 'Hearts', value: 8, url: ''},{suit: 'Hearts', value: 9, url: ''},{suit: 'Hearts', value: 10, url: ''},{suit: 'Hearts', value: 'J', url: ''},{suit: 'Hearts', value: 'Q', url: ''},{suit: 'Hearts', value: 'K', url: ''},{suit: 'Hearts', value: 'A', url: ''},{suit: 'Spades', value: 2, url: ''},{suit: 'Spades', value: 3, url: ''},{suit: 'Spades', value: 4, url: ''},{suit: 'Spades', value: 5, url: ''},{suit: 'Spades', value: 6, url: ''},{suit: 'Spades', value: 7, url: ''},{suit: 'Spades', value: 8, url: ''},{suit: 'Spades', value: 9, url: ''},{suit: 'Spades', value: 10, url: ''},{suit: 'Spades', value: 'J', url: ''},{suit: 'Spades', value: 'Q', url: ''},{suit: 'Spades', value: 'K', url: ''},{suit: 'Spades', value: 'A', url: ''}];
let _playerCards = [];
let _dealerCards = [];
let _message = '';
let _playerTotal = undefined;
let _dealerTotal = undefined;

class CardStores extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      console.log('action: ',action);
      switch(action.type) {
        case 'PLAYER_DRAW':
          let newCard = _cards.pop();
          _playerCards.push(newCard);
          this.emit('CHANGE');
          break;
        case 'DEALER_DRAW':
          let newCardDealer = _cards.pop();
          _dealerCards.push(newCardDealer);
          this.emit('CHANGE');
          break;
        case 'NEW_GAME':
          _cards = lodash.shuffle(_cards);
          this.emit('CHANGE');
          break;
        case 'TOTAL_PLAYER':
          let cardTotal = 0;
          let aceCount = 0;
          for (let i=0;i<_playerCards.length;i++) {
            let card = _playerCards[i];

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

          _playerTotal = cardTotal;

          this.emit('CHANGE');
          break;
        case 'TOTAL_DEALER':
          let cardTotal2 = 0;
          let aceCount2 = 0;
          for (let i=0;i<_dealerCards.length;i++) {
            let card = _dealerCards[i];

            if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
              if (cardTotal2+10>21 && aceCount2 > 0) {
                cardTotal2 -= 10;
                aceCount2--;
                cardTotal2 += 10;
              } else {
                cardTotal2 += 10;
              }
            } else if (card.value === 'A') {
              aceCount2++;
              if(cardTotal2>10) {
                aceCount2--;
                cardTotal2 += 1;
              } else {
                cardTotal2 += 11;
              }
            } else {
              if (cardTotal2+card.value>21 && aceCount2 > 0) {
                cardTotal2 -= 10;
                aceCount2--;
                cardTotal2 += card.value;
              } else {
                cardTotal2 += card.value;
              }
            }
          }
          _dealerTotal = cardTotal2;
          this.emit('CHANGE');
          break;
        case 'CHECK_BUST':
          if(_playerTotal === 21) {
              _message = 'BLACK JACKED!!!';
          } else if (_playerTotal > 21) {
            _message = 'BUST :(';
          }
          this.emit('CHANGE');
          break;
        case 'CHECK_WINNER':
          if (_dealerTotal > 21) {
            _message = 'You Win!';
          } else if (_playerTotal > _dealerTotal) {
            _message = 'You Win!';
          } else if (_dealerTotal > _playerTotal) {
            _message = 'You Win!';
          } else if (_dealerTotal === _playerTotal) {
            _message = 'Push :(';
          }
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

  getPlayerHand() {
    return _playerCards;
  }

  getPlayerTotal() {
    return _playerTotal;
  }

  getMessage() {
    return _message;
  }

  getDealerHand() {
    return _dealerCards;
  }

  getDealerTotal() {
    return _dealerTotal;
  }

}

export default new CardStores();
