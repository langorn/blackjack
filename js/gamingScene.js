import { GameRules } from './gameRule.js';

// set card Image / value;
let creditTXT;
let cardSumTXT;
let dealerCardSumTXT;
let betTXT;
let hitBTN;
let placeBetHintTXT;

let standBTN;
let dealBTN;
let ourMarkIMG;
let dealerMarkIMG;

let msg = {
  loseMSG:'',
  dealerMSG:''
}
let token20;
let token500;
let token100;
let token1000;

let cardInfo = {
  '0': { img:'A1', grade:4, type:'A', value:1 },
  '1': { img:'A2', grade:4, type:'normal', value:2 },
  '2': { img:'A3', grade:4, type:'normal', value:3 },
  '3': { img:'A4', grade:4, type:'normal', value:4 },
  '4': { img:'A5', grade:4, type:'normal', value:5 },
  '5': { img:'A6', grade:4, type:'normal', value:6 },
  '6': { img:'A7', grade:4, type:'normal', value:7 },
  '7': { img:'A8', grade:4, type:'normal', value:8 },
  '8': { img:'A9', grade:4, type:'normal', value:9 },
  '9': { img:'A10', grade:4, type:'normal', value:10 },
  '10': { img:'A11', grade:4, type:'J', value:10 },
  '11': { img:'A12', grade:4, type:'Q', value:10 },
  '12': { img:'A13', grade:4, type:'K', value:10 },
  '13': { img:'B1', grade:3, type:'A', value:1 },
  '14': { img:'B2', grade:3, type:'normal', value:2 },
  '15': { img:'B3', grade:3, type:'normal', value:3 },
  '16': { img:'B4', grade:3, type:'normal', value:4 },
  '17': { img:'B5', grade:3, type:'normal', value:5 },
  '18': { img:'B6', grade:3, type:'normal', value:6 },
  '19': { img:'B7', grade:3, type:'normal', value:7 },
  '20': { img:'B8', grade:3, type:'normal', value:8 },
  '21': { img:'B9', grade:3, type:'normal', value:9 },
  '22': { img:'B10', grade:3, type:'normal', value:10 },
  '23': { img:'B11', grade:3, type:'normal', value:10 },
  '24': { img:'B12', grade:3, type:'normal', value:10 },
  '25': { img:'B13', grade:3, type:'normal', value:10 },
  '26': { img:'C1', grade:2, type:'normal', value:1 },
  '27': { img:'C2', grade:2, type:'normal', value:2 },
  '28': { img:'C3', grade:2, type:'normal', value:3 },
  '29': { img:'C4', grade:2, type:'normal', value:4 },
  '30': { img:'C5', grade:2, type:'normal', value:5 },
  '31': { img:'C6', grade:2, type:'normal', value:6 },
  '32': { img:'C7', grade:2, type:'normal', value:7 },
  '33': { img:'C8', grade:2, type:'normal', value:8 },
  '34': { img:'C9', grade:2, type:'normal', value:9 },
  '35': { img:'C10', grade:2, type:'normal', value:10 },
  '36': { img:'C11', grade:2, type:'J', value:10 },
  '37': { img:'C12', grade:2, type:'Q', value:10 },
  '38': { img:'C13', grade:2, type:'K', value:10 },
  '39': { img:'D1', grade:1, type:'A', value:1 },
  '40': { img:'D2', grade:1, type:'normal', value:2 },
  '41': { img:'D3', grade:1, type:'normal', value:3 },
  '42': { img:'D4', grade:1, type:'normal', value:4 },
  '43': { img:'D5', grade:1, type:'normal', value:5 },
  '44': { img:'D6', grade:1, type:'normal', value:6 },
  '45': { img:'D7', grade:1, type:'normal', value:7 },
  '46': { img:'D8', grade:1, type:'normal', value:8 },
  '47': { img:'D9', grade:1, type:'normal', value:9 },
  '48': { img:'D10', grade:1, type:'normal', value:10 },
  '49': { img:'D11', grade:1, type:'J', value:10 },
  '50': { img:'D12', grade:1, type:'Q', value:10 },
  '51': { img:'D13', grade:1, type:'K', value:10 },
}


let stateManager = {
  'init': true,
  'afterBet': false,
  'afterStand': false,
  'afterMatch': false
}

let stateUIManager = {
  'init': () => {
    dealBTN.setAlpha(0.2);
  },
  'afterBet': () => {
    standBTN.setAlpha(1);
    hitBTN.setAlpha(1);
    token20.disableInteractive();
    token100.disableInteractive();
    token500.disableInteractive();
    token1000.disableInteractive();
    placeBetHintTXT.setVisible(false);
  },
  'afterStand': () => {
    standBTN.setAlpha(0.2);
    hitBTN.setAlpha(0.2);
    token20.disableInteractive();
    token100.disableInteractive();
    token500.disableInteractive();
    token1000.disableInteractive();
  },
  'afterMatch': () => {
    dealBTN.setAlpha(1);
    standBTN.setAlpha(0.2).disableInteractive();
    hitBTN.setAlpha(0.2).disableInteractive();
  }

};

var cardUI = {

  loadBackground: (scene) => {

    scene.add.image(600, 300, 'table');
    scene.add.image(950, 150, 'dealer');
    dealBTN = scene.add.image(350, 480, 'deal').setAlpha(0.2);
    hitBTN = scene.add.image(850, 530, 'hit').setAlpha(0.2);
    standBTN = scene.add.image(970, 480, 'stand').setAlpha(0.2);
    dealerMarkIMG = scene.add.image(420, 300, 'dealerMark');
    ourMarkIMG = scene.add.image(420, 150, 'ourMark');

    token20 = scene.add.image(1150, 150, 'token20');
    token500 = scene.add.image(1150, 250, 'token500');
    token100 = scene.add.image(1150, 350, 'token100');
    token1000 = scene.add.image(1150, 450, 'token1000');

    betTXT = scene.add.text(605, 550,  GameRules.betAmount, { fontSize: '40px', fill: '#FFFFFB', boundsAlignH: "center", boundsAlignV: "center"})
    .﻿setOrigin(0.5, 0);
    creditTXT = scene.add.text(150, 50, 'credit: '+ GameRules.credit, { fontSize: '32px', fill: '#FFFFFB', boundsAlignH: "center", boundsAlignV: "center"})
    .﻿setOrigin(0.5, 0);
    cardSumTXT = scene.add.text(420, 292, '0', { fontSize: '20px', fill: '#FFFFFB', boundsAlignH: "center", boundsAlignV: "center"})
    .﻿setOrigin(0.5, 0);
    dealerCardSumTXT = scene.add.text(420, 142, '0', { fontSize: '20px', fill: '#FFFFFB', boundsAlignH: "center", boundsAlignV: "center"})
    .﻿setOrigin(0.5, 0);
    placeBetHintTXT = scene.add.text(590, 380, 'Please Place Your Bet First !', { fontSize: '20px', fill: '#FFFFFB', boundsAlignH: "center", boundsAlignV: "center"})
    .﻿setOrigin(0.5, 0).setVisible(false);

    msg.loseMSG = scene.add.image(550, 230, 'buttonAssets', 'lose').setVisible(false);
    msg.dealerMSG = scene.add.image(550, 230, 'buttonAssets', 'win').setVisible(false);
    scene.sound.add('dealCard');
  },

  init: (scene, Phaser) => {

    // give player 2 card first --- game initial setting
    let position = GameRules.rules(1);
    GameRules.ourCard.push(position[0]);
    GameRules.ourCard.push(position[1]);
    // give dealer 1 card first --- game initial setting
    GameRules.dealerCard.push(position[2]);

    // render card position
    position.forEach( (item, index) => {
      let cardNo = item.cardNo;
      let cardImg = cardInfo[cardNo];
      cardUI.deal(580, 200, position[index]['position'][0], position[index]['position'][1], scene, index, cardImg);
    })
    cardUI.cal(scene);
    cardUI.calDealer(scene);
    stateUIManager.init();
  },
  matchAgain : (scene) => {
    msg.loseMSG.setVisible(false);
    msg.dealerMSG.setVisible(false);
    GameRules.resetAll();
    scene.scene.restart();
    //57, 70
  },
  deal: (oriX, oriY, x, y, scene, index, cardImg) => {
    // deal / move card to location
    let card;
    scene.sound.play('dealCard');
    card = scene.add.image(oriX, oriY, 'assets', cardImg.img).setScale(1.8)

    scene.tweens.add({
        targets: card,
        x: x,
        y: y,
        duration: 500,
        delay: index * 1000,
        ease: 'Linear',
        repeat: 0,
        yoyo: false
    });
  },

  cal: (scene) => {
    let result;
    result = GameRules.calculate(cardInfo);
    cardSumTXT.setText(result);

    let isBurst = GameRules.isBurst(result);

    if ( isBurst ) {
      cardUI.showMsg(null, null, null, scene, 'playerLose');
      cardUI.isWin(isBurst);
      stateUIManager.afterMatch();
    }
    return result;
  },
  calDealer: (scene) => {
    let result;
    result = GameRules.calculate(cardInfo, 'dealer');
    dealerCardSumTXT.setText(result);

    let isBurst = GameRules.isBurst(result);
    if ( isBurst ) {
      console.log('dealerburst')
      cardUI.showMsg(null, null, null, scene, 'dealerBurst');
      stateUIManager.afterMatch();
    }
    return result;
  },

  playerHit: (scene) => {

    if (GameRules.ourCard.length > 4) {
      return
    }

    let position = GameRules.rules(2);
    let cardNo = position[0].cardNo;
    let cardImg = cardInfo[cardNo];
    let index = 0;

    GameRules.ourCard.push(position[0]);
    cardUI.deal(580, 200, position[0]['position'][0], position[0]['position'][1], scene, index, cardImg);
    cardUI.cal(scene);
  },

  playerStand: (scene) => {
    // the maximum is 5 card
    stateUIManager.afterStand();
    let isWinGame;
    let isDealerBurst;
    for(let i = 1; i <= 5; i++) {
        let playerSum = GameRules.calculate(cardInfo);
        let dealerSum = GameRules.calculate(cardInfo, 'dealer');
        dealerCardSumTXT.setText(dealerSum);

        isDealerBurst = GameRules.isBurst(dealerSum);
        // if < 21, and havent win the player, then dealer ask 1 more card ...
        if (!isDealerBurst && (dealerSum < playerSum) ) {
          //i+1 find the current dealer card position
          let position = GameRules.rules(3 , i);
          let cardNo = position[0].cardNo;
          let cardImg = cardInfo[cardNo];
          let index = 0;
          GameRules.dealerCard.push(position[0])
          cardUI.deal(570, 80, position[0]['position'][0], position[0]['position'][1], scene, index, cardImg);
          cardUI.calDealer(scene);

        } else if (isDealerBurst) {
           // if dealer over 21
           cardUI.showMsg(null, null, null, scene, 'dealerBurst');
           isWinGame = true;
        } else if (!isDealerBurst &&  (dealerSum >= playerSum) ) {
          // dealer win
           cardUI.showMsg(null, null, null, scene, 'playerLose');
           isWinGame = false;
        }
    }

    if ( isWinGame ) {
      cardUI.showMsg(null, null, null, scene, 'dealerBurst');
      cardUI.isWin(false, isDealerBurst);
    } else {
      cardUI.isWin();
    }
    stateUIManager.afterMatch();
    scene.deck.forEach((item, index)=> {
        if ( index < 10) {
          // console.log(cardInfo[item].img);
        }
    })
  },

  playerBet: (scene, amount) => {
    GameRules.betAmount = amount;
    betTXT.setText(amount);
    stateUIManager.afterBet();
  },

  isWin: (isPlayerBurst, isDealerBurst) => {
    let result = false;
    let playerSum = GameRules.calculate(cardInfo);
    let dealerSum = GameRules.calculate(cardInfo, 'dealer');
    // if player
    if (isPlayerBurst) {
      GameRules.credit -= GameRules.betAmount;
      creditTXT.setText('credit: ' + GameRules.credit)
    } else if (isDealerBurst) {
      GameRules.credit += GameRules.betAmount;
      creditTXT.setText('credit: ' + GameRules.credit)
    } else if (!isPlayerBurst && playerSum > dealerSum) {
      GameRules.credit += GameRules.betAmount;
      creditTXT.setText('credit: ' + GameRules.credit);
    }else if (!isDealerBurst && dealerSum > playerSum) {
      GameRules.credit -= GameRules.betAmount;
      creditTXT.setText('credit: ' + GameRules.credit)
    } else {
      GameRules.credit -= GameRules.betAmount;
      creditTXT.setText('credit: ' + GameRules.credit)
    }
  },

  showMsg: (x, y, message, scene, type) => {
    let msgContent;
    switch (type) {
      case 'playerLose':
        msgContent = msg.loseMSG;
        break;
      case 'dealerBurst':
        msgContent = msg.dealerMSG;
        break;
      default:
        break;
    }

    let prom = new Promise(( resolve, reject ) => {
        msgContent.setDepth(1)
        resolve(msgContent.setVisible(true));
    })
  }
}

var GamingScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
  function GamingScene()
  {
    Phaser.Scene.call(this, {key: 'GamingScene'});
  },
  preload: function ()
  {
    this.load.image('table', 'assets/casino2/background.png');
    this.load.image('dealer', 'assets/casino2/card-sheet0.png');
    this.load.image('ground', 'assets/casino/ground.png');

    //load used assets
    this.load.atlas('assets', 'assets/casino2/allcard.png', 'assets/casino2/assets.json');
    this.load.atlas('buttonAssets', 'assets/casino2/log-sheet0.png', 'assets/casino2/buttonAsset.json');

    // bet action ui
    this.load.image('deal', 'assets/casino2/deal-sheet0.png');
    this.load.image('hit', 'assets/casino2/hit-sheet0.png');
    this.load.image('stand', 'assets/casino2/stand-sheet0.png');

    // token
    this.load.image('token20', 'assets/casino2/20.png');
    this.load.image('token100', 'assets/casino2/100.png');
    this.load.image('token500', 'assets/casino2/500.png');
    this.load.image('token1000', 'assets/casino2/1000.png');

    // ourMark
    this.load.image('ourMark', 'assets/casino2/point-sheet1.png');
    this.load.image('dealerMark', 'assets/casino2/point-sheet2.png');

    // sound
    this.load.audio('dealCard', 'assets/sound/deal-card-short.mp3');
  },
  create: function ()
  {
    var platform;
    var player;
    var cursors;
    var stars;
    var score = 0;
    var scroreText;

    // setup the initial assets
    cardUI.loadBackground(this);
    //shuffle card for the game (phaser3 function)

    this.deck = GameRules.shuffle(Phaser);
    cardUI.init(this, Phaser);

    dealBTN.setInteractive()
    .on('pointerdown', this.deal, this)
    .on('pointerup', ()=> { dealBTN.setScale(1.1) })

    hitBTN.setInteractive()
    .on('pointerdown', this.hit, this)
    .on('pointerup', ()=> { hitBTN.setScale(1.1)
     })

    standBTN.setInteractive()
    .on('pointerdown', this.stand, this)
    .on('pointerup', ()=> { standBTN.setScale(1.1) })

    token20.setInteractive()
    .on('pointerdown', () => { cardUI.playerBet(this, 20) } , this)
    .on('pointerup', ()=> { token20.setScale(1.1) })


    token100.setInteractive()
    .on('pointerdown', () => { cardUI.playerBet(this, 100) } , this)
    .on('pointerup', ()=> { token100.setScale(1.1) })


    token500.setInteractive()
    .on('pointerdown', () => { cardUI.playerBet(this, 500) } , this)
    .on('pointerup', ()=> { token500.setScale(1.1) })


    token1000.setInteractive()
    .on('pointerdown', () => { cardUI.playerBet(this, 1000) } , this)
    .on('pointerup', ()=> { token1000.setScale(1.1) })


  },
  deal: function ()
  {
    cardUI.matchAgain(this);
    dealBTN.setScale(0.8);
  },
  hit: function ()
  {
    if (GameRules.betAmount <= 0 ) {
      placeBetHintTXT.setVisible(true);
      return
    }
    cardUI.playerHit(this);
  },
  stand: function ()
  {
    if (GameRules.betAmount <= 0 ) {
      placeBetHintTXT.setVisible(true);
      return
    }
    cardUI.playerStand(this);
  }
})

export default GamingScene;
