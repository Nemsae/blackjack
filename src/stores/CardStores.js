import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';
import lodash from 'lodash';
import CardActions from '../actions/CardActions'
import JohnsUtilityBelt from '../JohnsUtilityBelt'

let _cards = [{suit: 'Clubs', value: 2, img: '🃒'},{suit: 'Clubs', value: 3, img: '🃓'},{suit: 'Clubs', value: 4, img: '🃔'},{suit: 'Clubs', value: 5, img: '🃕'},{suit: 'Clubs', value: 6, img: '🃖'},{suit: 'Clubs', value: 7, img: '🃗'},{suit: 'Clubs', value: 8, img: '🃘'},{suit: 'Clubs', value: 9, img: '🃙'},{suit: 'Clubs', value: 10, img: '🃚'},{suit: 'Clubs', value: 'J', img: '🃛'},{suit: 'Clubs', value: 'Q', img: '🃝'},{suit: 'Clubs', value: 'K', img: '🃞'},{suit: 'Clubs', value: 'A', img: '🃑'},{suit: 'Diamonds', value: 2, img: '🃂'},{suit: 'Diamonds', value: 3, img: '🃃'},{suit: 'Diamonds', value: 4, img: '🃄'},{suit: 'Diamonds', value: 5, img: '🃅'},{suit: 'Diamonds', value: 6, img: '🃆'},{suit: 'Diamonds', value: 7, img: '🃇'},{suit: 'Diamonds', value: 8, img: '🃈'},{suit: 'Diamonds', value: 9, img: '🃉'},{suit: 'Diamonds', value: 10, img: '🃊'},{suit: 'Diamonds', value: 'J', img: '🃋'},{suit: 'Diamonds', value: 'Q', img: '🃍'},{suit: 'Diamonds', value: 'K', img: '🃎'},{suit: 'Diamonds', value: 'A', img: '🃁'},{suit: 'Hearts', value: 2, img: '🂲'},{suit: 'Hearts', value: 3, img: '🂳'},{suit: 'Hearts', value: 4, img: '🂴'},{suit: 'Hearts', value: 5, img: '🂵'},{suit: 'Hearts', value: 6, img: '🂶'},{suit: 'Hearts', value: 7, img: '🂷'},{suit: 'Hearts', value: 8, img: '🂸'},{suit: 'Hearts', value: 9, img: '🂹'},{suit: 'Hearts', value: 10, img: '🂺'},{suit: 'Hearts', value: 'J', img: '🂻'},{suit: 'Hearts', value: 'Q', img: '🂽'},{suit: 'Hearts', value: 'K', img: '🂾'},{suit: 'Hearts', value: 'A', img: '🂱'},{suit: 'Spades', value: 2, img: '🂢'},{suit: 'Spades', value: 3, img: '🂣'},{suit: 'Spades', value: 4, img: '🂤'},{suit: 'Spades', value: 5, img: '🂥'},{suit: 'Spades', value: 6, img: '🂦'},{suit: 'Spades', value: 7, img: '🂧'},{suit: 'Spades', value: 8, img: '🂨'},{suit: 'Spades', value: 9, img: '🂩'},{suit: 'Spades', value: 10, img: '🂪'},{suit: 'Spades', value: 'J', img: '🂫'},{suit: 'Spades', value: 'Q', img: '🂭'},{suit: 'Spades', value: 'K', img: '🂮'},{suit: 'Spades', value: 'A', img: '🂡'}];
let _playerCards = [];
let _dealerCards = [];
let _message = '';
let _playerTotal = undefined;
let _dealerTotal = undefined;

class CardStores extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
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
        case 'DEALER_BLANK':
          let { blankCard } = action.payload;
          _dealerCards.push(blankCard);
          this.emit('CHANGE');
          break;
        case 'DELETE_BLANK':
          let noBlankCards = _dealerCards.filter(card=> {
            if (card.suit == 'blank') {
              return;
            } else {
              return card;
            }
          })
          _dealerCards = noBlankCards;
          this.emit('CHANGE');
          break;
        case 'NEW_GAME':
          _cards = lodash.shuffle(_cards);
          this.emit('CHANGE');
          break;
        case 'TOTAL_PLAYER':
          let newTotal1 = this.countHand(_playerCards);
          _playerTotal = newTotal1;
          this.emit('CHANGE');
          break;
        case 'TOTAL_DEALER':
          let newTotal2 = this.countHand(_dealerCards);
          _dealerTotal = newTotal2;
          this.emit('CHANGE');
          break;
        case 'CHECK_BUST':
          if(_playerTotal === 21) {
              _message = 'BLACKJACK!!!';
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
            _message = 'You Lose :(';
          } else if (_dealerTotal === _playerTotal) {
            _message = 'Push :(';
          }
          this.emit('CHANGE');
          break;
        case 'CHECK_STAY':
          this.flipBlank();
          while (_dealerTotal<18) {
            this.pushCard();
            let newTotal3 = this.countHand(_dealerCards);
            _dealerTotal = newTotal3;
          }
          this.emit('CHANGE');
          break;
        case 'RESET_GAME':
          let { newDeck } = action.payload;
          _cards = newDeck;
          _playerCards = [];
          _dealerCards = [];
          _message = '';
          _playerTotal = undefined;
          _dealerTotal = undefined;
          this.emit('CHANGE');
          break;
      }
    });
  }

  flipBlank() {
    let newCard2 = _cards.pop();
    _dealerCards.unshift(newCard2);
  }

  pushCard() {
    let newCardDealer = _cards.pop();
    _dealerCards.push(newCardDealer);
  }

  countHand(array) {
    let cardTotal = 0;
    let aceCount = 0;
    for (let i=0;i<array.length;i++) {
      let card = array[i];

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
    return cardTotal;
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
