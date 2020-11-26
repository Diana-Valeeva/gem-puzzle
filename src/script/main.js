/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import style from '../styles/style.css';
import * as storage from './storage.js';
import Game from './game.js';
import MainPage from './mainPage.js';
import Menu from './menu.js';
import EndGameAlert from './endGameAlert.js';
import BestScores from './bestScores.js';

const page = new MainPage();
page.createInnerHtml();

function getRandomPic() {
    const base = '../assets/';
    const picArr = [];
    for (let i = 0; i < 32; i++) {
        picArr.push(`${i}.jpg`);
    }
    return `url("${base}${picArr[Math.floor(Math.random() * 32)]}")`;
}

const game = new Game();
game.init(true);
game.field.setBackground(getRandomPic());
const menu = new Menu();
menu.createMenu();
const gameAlert = new EndGameAlert();
gameAlert.createAlert();
const scores = new BestScores();
scores.createScores();

function newGame() {
    game.isSolveStopped = true;
    gameAlert.close();
    game.clear();
    game.init(true);
    game.field.setBackground(getRandomPic());
}

function saveGame() {
    game.save();
    menu.close();
    game.timer.startTimer();
}

function loadGame() {
    game.isSolveStopped = true;
    menu.close();
    gameAlert.close();
    game.clear();
    game.init(false);
    game.timer.startTimer();
    game.field.setBackground(storage.get('background'));
    game.loadMix();
}

function pause() {
    game.pause();
    menu.open();
}

function closeMenu() {
    menu.close();
    game.timer.startTimer();
}

function solve() {
    menu.close();
    game.isSolveStopped = false;
    game.solve();
    gameAlert.header.textContent = 'YOU FAILED';
    gameAlert.menu.style.background = 'transparent';
    gameAlert.open();
    game.endGame();
}

function mute() {
    game.soundOn = false;
    document.querySelector('.mute_ico').textContent = 'volume_off';
}

function setPic() {
    game.field.setBackground(getRandomPic());
    menu.close();
    game.timer.startTimer();
}

document.querySelector('.mute__button').addEventListener('click', mute);
document.querySelector('.solve').addEventListener('click', solve);
document.querySelector('.pause-game__button').addEventListener('click', pause);
document.querySelector('.close__button').addEventListener('click', closeMenu);
document.querySelector('.menu__container').addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    if (event.target === menu.container) {
        menu.close();
    }
});
document.querySelector('.new-game__button').addEventListener('click', newGame);
document.querySelector('.save').addEventListener('click', saveGame);
document.querySelector('.picture').addEventListener('click', setPic);
document.querySelector('.main').addEventListener('click', () => {
    if (game.isFinished()) {
        gameAlert.header.textContent = 'YOU WON';
        gameAlert.score.textContent = `Your result is ${document.querySelector('.time').textContent} and ${game.countMoves} moves`;
        gameAlert.setBackground();
        gameAlert.open();
        game.endGame();
    }
});
document.querySelector('.new-game').addEventListener('click', newGame);
document.querySelectorAll('.load').forEach((elem) => elem.addEventListener('click', loadGame));
document.querySelectorAll('.scores').forEach((elem) => elem.addEventListener('click', () => {
    scores.open(game.fieldSize);
}));
document.querySelector('.scores__close').addEventListener('click', () => {
    scores.close();
});