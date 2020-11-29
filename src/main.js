'use strict';
import PopUp from './popup.js';
import {GameBuilder, Reason } from './game.js';

const gameFinishedBanner = new PopUp();

const game = new GameBuilder()
  .withGameDuration(5)
  .withCarrotCount(3)
  .withBugCount(3)
  .build()

game.setGameStopListener((reason)=>{
  let message;
  switch(reason){
    case Reason.cancel:'REPLAY❓'
      break;
    case Reason.win: 'YOU WON 🎉'
      break;
    case Reason.lose: 'YOU LOST 💩'
        break;
      default:
        throw new Error('not valid reason');
  }
  gameFinishedBanner.showWithText(message);
})

gameFinishedBanner.setClickListener(()=>{
  game.start();
})