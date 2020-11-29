'use strict';
import PopUp from './popup.js';
import GameBuilder from './game.js';

const gameFinishedBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build()

game.setGameStopListener((reason)=>{
  let message;
  switch(reason){
    case 'cancel':'REPLAY❓'
      break;
    case 'win': 'YOU WON 🎉'
      break;
    case 'lose': 'YOU LOST 💩'
        break;
      default:
        throw new Error('not valid reason');
  }
  gameFinishedBanner.showWithText(message);
})

gameFinishedBanner.setClickListener(()=>{
  game.start();
})