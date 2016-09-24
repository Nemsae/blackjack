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
}

export default CardActions;
