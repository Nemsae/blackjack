import AppDispatcher from '../AppDispatcher';

const CardActions = {
  draw() {
    AppDispatcher.dispatch({
      type: 'CARD_GRAB',
    })
  },

  shuffle() {
    AppDispatcher.dispatch({
      type: 'SHUFFLE',
    })
  },

  totalPlayer() {
    AppDispatcher.dispatch({
      type: 'TOTAL_PLAYER'
    })
  },
}

export default CardActions;
