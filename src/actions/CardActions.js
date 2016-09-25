import AppDispatcher from '../AppDispatcher';

const CardActions = {
  draw() {
    AppDispatcher.dispatch({
      type: 'PLAYER_DRAW',
    })
  },

  newGame() {
    AppDispatcher.dispatch({
      type: 'NEW_GAME',
    })
  },

  totalPlayer() {
    AppDispatcher.dispatch({
      type: 'TOTAL_PLAYER'
    })
  },

  dealerDraw() {
    AppDispatcher.dispatch({
      type: 'DEALER_DRAW'
    })
  },

  dealerDrawBlank() {
    AppDispatcher.dispatch({
      type: 'DEALER_BLANK',
      payload: {
        blankCard: {suit: 'blank', value: 0, img: '🂠'},
      }
    })
  },

  deleteBlank() {
    AppDispatcher.dispatch({
      type: 'DELETE_BLANK'
    })
  },

  totalDealer() {
    AppDispatcher.dispatch({
      type: 'TOTAL_DEALER'
    })
  },

  winnerCheck() {
    AppDispatcher.dispatch({
      type: 'CHECK_WINNER'
    })
  },

  bustCheck() {
    AppDispatcher.dispatch({
      type: 'CHECK_BUST'
    })
  },

  stayCheck() {
    AppDispatcher.dispatch({
      type: 'CHECK_STAY'
    })
  },

  reset() {
    AppDispatcher.dispatch({
      type: 'RESET_GAME',
      payload: {
        newDeck: [{suit: 'Clubs', value: 2, img: '🃒'},{suit: 'Clubs', value: 3, img: '🃓'},{suit: 'Clubs', value: 4, img: '🃔'},{suit: 'Clubs', value: 5, img: '🃕'},{suit: 'Clubs', value: 6, img: '🃖'},{suit: 'Clubs', value: 7, img: '🃗'},{suit: 'Clubs', value: 8, img: '🃘'},{suit: 'Clubs', value: 9, img: '🃙'},{suit: 'Clubs', value: 10, img: '🃚'},{suit: 'Clubs', value: 'J', img: '🃛'},{suit: 'Clubs', value: 'Q', img: '🃝'},{suit: 'Clubs', value: 'K', img: '🃞'},{suit: 'Clubs', value: 'A', img: '🃑'},{suit: 'Diamonds', value: 2, img: '🃂'},{suit: 'Diamonds', value: 3, img: '🃃'},{suit: 'Diamonds', value: 4, img: '🃄'},{suit: 'Diamonds', value: 5, img: '🃅'},{suit: 'Diamonds', value: 6, img: '🃆'},{suit: 'Diamonds', value: 7, img: '🃇'},{suit: 'Diamonds', value: 8, img: '🃈'},{suit: 'Diamonds', value: 9, img: '🃉'},{suit: 'Diamonds', value: 10, img: '🃊'},{suit: 'Diamonds', value: 'J', img: '🃋'},{suit: 'Diamonds', value: 'Q', img: '🃍'},{suit: 'Diamonds', value: 'K', img: '🃎'},{suit: 'Diamonds', value: 'A', img: '🃁'},{suit: 'Hearts', value: 2, img: '🂲'},{suit: 'Hearts', value: 3, img: '🂳'},{suit: 'Hearts', value: 4, img: '🂴'},{suit: 'Hearts', value: 5, img: '🂵'},{suit: 'Hearts', value: 6, img: '🂶'},{suit: 'Hearts', value: 7, img: '🂷'},{suit: 'Hearts', value: 8, img: '🂸'},{suit: 'Hearts', value: 9, img: '🂹'},{suit: 'Hearts', value: 10, img: '🂺'},{suit: 'Hearts', value: 'J', img: '🂻'},{suit: 'Hearts', value: 'Q', img: '🂽'},{suit: 'Hearts', value: 'K', img: '🂾'},{suit: 'Hearts', value: 'A', img: '🂱'},{suit: 'Spades', value: 2, img: '🂢'},{suit: 'Spades', value: 3, img: '🂣'},{suit: 'Spades', value: 4, img: '🂤'},{suit: 'Spades', value: 5, img: '🂥'},{suit: 'Spades', value: 6, img: '🂦'},{suit: 'Spades', value: 7, img: '🂧'},{suit: 'Spades', value: 8, img: '🂨'},{suit: 'Spades', value: 9, img: '🂩'},{suit: 'Spades', value: 10, img: '🂪'},{suit: 'Spades', value: 'J', img: '🂫'},{suit: 'Spades', value: 'Q', img: '🂭'},{suit: 'Spades', value: 'K', img: '🂮'},{suit: 'Spades', value: 'A', img: '🂡'}]
      }
    })
  }


}

export default CardActions;
