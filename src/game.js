'use strict';
import Field from './field.js';
import * as sound from './sound.js';

export default class Game{
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameBtn = document.querySelector('.game__button');
        this.timerIndicator = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn.addEventListener('click', () => {
            if (started) {
              this.stop();
            } else {
              this.start();
            }
          });

        this.gameField = new Field(carrotCount,bugCount);
        this.gameField.setClickListener(onItemClick);
        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }

    setGAmeStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
}
  
stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    // this.gameFinishedBanner.showWithText('REPLAY❓');
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop('cancel');
  }

finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer();
    sound.stopBackground()
    // this.gameFinishedBanner.showWithText(win ? 'YOU WON 🎉' : 'YOU LOST 💩');
    this.onGameStop && this.onGameStop(win? 'win' : 'lose');
  }
  
    
    onItemClick=(item)=> {
        if (!this.started) {
          return;
        }
        if (item ==='carrot') {
            this.score++;
            this.updateScoreBoard();
          if (score === CARROT_COUNT) {
            this.finishGame(true);
          }
        } else if (item ==='bug') {
            this.finishGame(false);
        }
      }

showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }
  
  hideGameButton() {
    this.gameBtn.style.visibility = 'hidden';
  }
  
  showTimerAndScore() {
    this.timerIndicator.style.visibility = 'visible';
    this.gameScore.style.visibility = 'visible';
  }
  
  startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(timer);
        this.finishGame(score === CARROT_COUNT);
        return;
      }
      this. updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  
  stopGameTimer() {
    clearInterval(timer);
  }
  
  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.timerIndicator.innerHTML = `${minutes}:${seconds}`;
  }
  
  initGame() {
    this.score = 0;
    this.gameScore.innerText = CARROT_COUNT;
    this.gameField.init();
  }
  
  updateScoreBoard() {
    this. gameScore.innerText = CARROT_COUNT - score;
  }
  
}