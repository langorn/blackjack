const GameRules = {
  // gaming state
  round: 1,
  cardIndex: 2,
  decks:[],
  ourCard: [],
  dealerCard: [],
  credit: 200,
  betAmount: 0,

  // game init value
  position: {
    selfCard: [ [540, 300], [580, 300], [620, 300], [660, 300], [700, 300], [740, 300] ],
    dealerCard: [ [540,150], [580, 150], [620, 150], [660, 150] ,[700,150], [740, 150] ]
  },

  // rules
  nextRound: () => {
    this.round += 1;
  },
  currentRount: () => {
    return this.round;
  },
  shuffle: (Phaser) => {
    let deck = Phaser.Utils.Array.NumberArray(0, 51);
    Phaser.Utils.Array.Shuffle(deck);
    GameRules.decks = deck;
    console.log(GameRules.decks)
    return deck;
  },
  rules: (round, cardIndex) => {
    let result;
    switch (round) {
      case 1:
        result = initialGame();
        break;
      case 2:
        result = playerStep();
        break;
      case 3:
        result = dealerStep(cardIndex);
        break;
      default:
        console.log('please enter round');
    }
    return result;
  },
  calculate: (cardSet, type) => {
    let result = 0;
    let setData = GameRules.ourCard;

    if (type=='dealer') {
      setData = GameRules.dealerCard;
    }
    if ( setData.length == 2 ) {
      let card1Val = cardSet[setData[0].cardNo].value;
      let card2Val = cardSet[setData[1].cardNo].value;
      let card1Type = cardSet[setData[0].cardNo].type;
      let card2Type = cardSet[setData[1].cardNo].type;
      result = Formula.twoCard(card1Val, card2Val, card1Type, card2Type);

    } else {
      let cardData = [];
      setData.forEach( item => {
        let card = {
          value: cardSet[item.cardNo].value,
          type: cardSet[item.cardNo].type,
        }
        cardData.push(card)
      })
      result = Formula.multiCard(cardData);
    }
    return result;
  },
  isBurst: (no) => {
    let result = false;
    if (no > 21) {
      result = true
    }
    return result;
  },
  isWin: () => {

  },
  resetAll: () => {

    GameRules.round = 1;
    GameRules.cardIndex = 2;
    GameRules.betAmount = 0;
    GameRules.decks = [];
    GameRules.ourCard = [];
    GameRules.dealerCard = [];
  }
};

const Formula = {

    twoCard: (card1, card2, type1, type2) => {
      let sum = 0;
      sum = card1 + card2;
      if ( type1 == 'A' && type2 == 'A' ) {
        sum = 21;
      } else if ( type1 == 'A' && (type2 =='J' || type2 == 'Q' || type2 =='K' ) ) {
        sum = 21;
      } else if ( type2 == 'A' && (type1 =='J' || type1 == 'Q' || type1 =='K' ) ) {
        sum = 21;
      } else if ( type1 == 'A' ) {
        sum = 10 + card2;
      } else if ( type2 == 'A' ) {
        sum = card1 + 10;
      }
      return sum;
    },
    multiCard:(cards) => {

      let result = 0;
      cards.filter(item => {
        result += item.value;
      })
      return result;
    }
}

function initialGame () {
  // lets get first 3 card
  let position = [];
  position.push( GameRules.position.selfCard[0] );
  position.push( GameRules.position.selfCard[1] );
  position.push( GameRules.position.dealerCard[0] );

  let location = [];
  GameRules.decks.filter( (item, index) => {
    if ( index < 3 ) {
        let card = {};
        card['cardNo'] = item;
        card['position'] = position[index];
        location.push(card);
    }
  })
  return location
}

function playerStep () {
  // lets get first 3 card
  GameRules.cardIndex++;
  let stepNo = GameRules.cardIndex;
  let position = [];
  position.push( GameRules.position.selfCard[stepNo - 1] );

  let location = [];

  let card = {};
  card['cardNo'] = GameRules.decks[stepNo];
  card['position'] = position[0];
  location.push(card);

  return location
}

function dealerStep (cardIndex) {
  GameRules.cardIndex++;
  let stepNo = GameRules.cardIndex;
  let position = [];
  position.push( GameRules.position.dealerCard[cardIndex] );
  let location = [];

  let card = {};
  card['cardNo'] = GameRules.decks[stepNo];
  card['position'] = position[0];
  location.push(card);

  return location;
}

export { GameRules };
