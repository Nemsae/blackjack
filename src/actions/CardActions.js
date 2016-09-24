import AppDispatcher from '../AppDispatcher';

const CardActions = {
  draw(card) {
    AppDispatcher.dispatch({
      type: 'CARD_GRAB',
      payload: {
        card: card,
      }
    })
  },

  shuffle(card) {
    AppDispatcher.dispatch({
      type: 'SHUFFLE',
      payload: {
        card: card,
      }
    })
  },
}

export default CardActions;
