const JohnsUtilityBelt = {
  countHand(array) {
    let cardTotal = 0;
    let aceCount = 0;
    for (let i=0;i<array.length;i++) {
      let card = array[i];

      if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
        if (cardTotal+10>21 && aceCount > 0) {
          cardTotal -= 10;
          aceCount--;
          // cardTotal += 10;
        } else {
          // cardTotal += 10;
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

}

export default JohnsUtilityBelt;
