'use strict';
import PopUp from './popup.js';
import Game from './game.js';

const CARROT_COUNT = 20;
const BUG_COUNT = 20;
const GAME_DURATION_SEC = 20;

const gameFinishedBanner = new PopUp();
gameFinishedBanner.setClickListener(()=>{
  startGame();
})

cost game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
game.setGameStopListener((reason)=>{
  let message;
  switch(reason){
    case 'cancel':
      break;
      case 'win':
        break;
        case 'lose':
          break;
  }
})
