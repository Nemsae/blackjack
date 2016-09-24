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
  }
}

export default CardActions;
