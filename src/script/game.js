/* eslint-disable import/extensions */
import GameField from './gameField.js';
import * as storage from './storage.js';
import Timer from './timer.js';

export default class Game {
    constructor() {
        // eslint-disable-next-line no-sequences
        this.select = document.querySelector('select').options,
        this.fieldSize = document.querySelector('select').options[this.select.selectedIndex].value,
        this.countMoves = 0,
        this.movesCont = document.querySelector('.count_moves'),
        this.isStopped = true,
        this.timer = new Timer(),
        this.mins = this.timer.mins,
        this.secs = this.timer.secs,
        this.field,
        this.emptyCell,
        this.gameCells,
        this.cells,
        this.numbers,
        this.bestScores = [],
        this.initialMoves = [],
        this.sound,
        this.bestScores = {},
        this.soundOn = true;
    }

    init(isNewGame = true) {
        // загрузка новой игры
        if (isNewGame) {
            this.fieldSize = document.querySelector('select').options[this.select.selectedIndex].value;
            this.numbers = this.getNumberArr();
            this.field = new GameField(this.fieldSize, this.numbers);
            this.initialMoves = [];
        } else { // загрузка сохраненной игры
            this.fieldSize = storage.get('fieldSize');
            this.field = new GameField(storage.get('fieldSize'), storage.get('numbers'));
            this.countMoves = storage.get('moves');
            this.timer = new Timer(storage.get('sec'), storage.get('min'));
            this.movesCont.innerText = this.countMoves;
            this.isStopped = false;
            this.initialMoves = storage.get('initialMoves');
        }

        this.field.createField();
        this.emptyCell = this.field.getEmpty();
        this.cells = this.field.cells;
        this.sound = this.field.sound;
        // if (this.isSolvable() === false) {
        //     let fourteen = this.cells.find(cell => cell.value == this.fieldSize ** 2 - 1);
        //     let fifteen = this.cells.find(cell => cell.value == this.fieldSize ** 2 - 2);
        //     this.swap(fourteen, fifteen);
        // }
        this.createBestScores();
        this.gameCells = [...document.querySelectorAll('.game_cell')];
        // eslint-disable-next-line no-restricted-syntax
        for (const cell of this.gameCells) {
            cell.addEventListener('click', () => {
                cell.style.transition = 'top 0.3s, left 0.3s';
                this.move(this.gameCells.indexOf(cell));
                if (this.soundOn) {
                    this.sound.play();
                }
            });

            cell.addEventListener('dragend', () => {
                cell.style.transition = 'none';
                this.move(this.gameCells.indexOf(cell));
                this.sound.play();
            });
        }
        if (isNewGame) {
            // eslint-disable-next-line eqeqeq
            if (this.fieldSize == 3 || this.fieldSize == 4) {
                this.mix(100);
            // eslint-disable-next-line eqeqeq
            } else if (this.fieldSize == 5 || this.fieldSize == 6) {
                this.mix(500);
            // eslint-disable-next-line eqeqeq
            } else if (this.fieldSize == 7 || this.fieldSize == 8) {
                this.mix(900);
            }
        }
    }

    // создание массива цифр в зависимости от размера поля
    getNumberArr() {
        const arr = [];
        for (let i = 1; i < this.fieldSize ** 2; i++) {
            arr.push(i);
        }
        arr.push(0);
        return arr;
    }

    // движение клеток по клику
    move(index) {
        const cell = this.cells[index];
        const leftDiff = Math.abs(this.emptyCell.column - cell.column);
        const topDiff = Math.abs(this.emptyCell.row - cell.row);
        if (leftDiff + topDiff > 1) {
            return;
        }
        this.initialMoves.push(cell.value);
        this.swap(cell, this.emptyCell);
        this.countMoves += this.countMoves;
        this.movesCont.innerText = this.countMoves;
        if (this.countMoves === 1) {
            this.isStopped = false;
            this.timer.startTimer();
        }
    }

    pause() {
        this.timer.stopTimer();
    }

    // меняем две клетки местами
    swap(elem1, elem2) {
        const width = document.querySelector('.game_field').offsetWidth;
        const tempTop = elem1.row;
        const tempLeft = elem1.column;
        elem1.element.style.left = `${elem2.column * width / this.fieldSize + elem2.column}px`;
        elem1.element.style.top = `${elem2.row * width / this.fieldSize + elem2.row}px`;
        elem2.element.style.left = `${tempLeft * width / this.fieldSize + tempLeft}px`;
        elem2.element.style.top = `${tempTop * width / this.fieldSize + tempTop}px`;
        elem1.column = elem2.column;
        elem1.row = elem2.row;
        elem2.column = tempLeft;
        elem2.row = tempTop;
    }

    // перемешивание исходного положения клеток
    mix(i) {
        let lastMove = 'right';
        for (let x = 0; x < i; x++) {
            const up = this.getRandomBool();
            const right = this.getRandomBool();
            let tempCell = {};
            if (up && !right && this.emptyCell.row > 0 && lastMove !== 'down') {
                // движение пустой клетки вверх
                tempCell = this.cells.find((elem) => elem.row
                === this.emptyCell.row - 1 && elem.column === this.emptyCell.column);
                this.swap(this.emptyCell, tempCell);
                lastMove = 'up';
                this.initialMoves.push(tempCell.value);
            } else if (!up && !right && this.emptyCell.row <= (this.fieldSize - 2) && lastMove !== 'up') {
                // движение пустой клетки вниз
                tempCell = this.cells.find((elem) => elem.row
                === this.emptyCell.row + 1 && elem.column === this.emptyCell.column);
                lastMove = 'down';
                this.swap(this.emptyCell, tempCell);
                this.initialMoves.push(tempCell.value);
            } else if (!up && right && this.emptyCell.column <= (this.fieldSize - 2) && lastMove !== 'left') {
                // движение пустой клетки вправо
                tempCell = this.cells.find((elem) => elem.row
                === this.emptyCell.row && elem.column === this.emptyCell.column + 1);

                this.swap(this.emptyCell, tempCell);
                lastMove = 'right';
                this.initialMoves.push(tempCell.value);
            } else if (up && right && this.emptyCell.column >= 1 && lastMove !== 'right') {
                // движение пустой клетки влево
                tempCell = this.cells.find((elem) => elem.row
                === this.emptyCell.row && elem.column === this.emptyCell.column - 1);
                this.swap(this.emptyCell, tempCell);
                lastMove = 'left';
                this.initialMoves.push(tempCell.value);
            }
        }
    }

    loadMix() {
        for (let ind = 0; ind < this.initialMoves.length; ind++) {
            const tempCell = this.cells.find((cell) => cell.value === this.initialMoves[ind]);
            this.swap(this.emptyCell, tempCell);
        }
    }

    // авторешение
    solve(ind = this.initialMoves.length) {
        ind -= 1;
        if (ind < 0 || this.isSolveStopped) {
            this.initialMoves = [];
            this.isSolveStopped = false;
            return;
        }
        const tempCell = this.cells.find((cell) => cell.value === this.initialMoves[ind]);
        this.swap(this.emptyCell, tempCell);
        setTimeout(() => {
            this.solve(ind);
        }, 300);
    }

    // возврат рандомного булевого значения
    // eslint-disable-next-line class-methods-use-this
    getRandomBool() {
        if (Math.floor(Math.random() * 2) === 0) {
            return true;
        }
        return false;
    }

    // isSolvable = () => {
    //     let cells = this.field.cells;
    //     let count = this.emptyCell.row + 1;
    //     for (let i = 0; i < cells.length; i++) {
    //         for (let j = i + 1; j < cells.length; j++) {
    //             if (cells[i].value > cells[j].value && cells[j].value !== 0) {
    //                 count++;

    //             }
    //         }
    //     }
    //     if (this.fieldSize % 2 !== 0) {
    //         return count % 2 !== 0;
    //     }
    //     return count % 2 === 0;
    // }
    // очистка игры
    clear() {
        this.countMoves = 0;
        const field = document.querySelector('.game_field');
        field.parentNode.removeChild(field);
        this.timer.stopTimer();
        this.timer.clearTimer();
        this.isStopped = true;
        const time = document.querySelector('.time');
        time.innerText = '00 : 00';
        this.movesCont.innerText = this.countMoves;
    }

    // проверка на собранность
    isFinished() {
        const temp = [...this.cells];
        temp.pop();
        return temp.every((cell) => cell.value === cell.row * this.fieldSize + cell.column + 1);
    }

    // сохранение текущей игры
    save() {
        storage.set('fieldSize', this.fieldSize);
        storage.set('moves', this.countMoves);
        storage.set('min', this.timer.mins);
        storage.set('sec', this.timer.secs);
        storage.set('numbers', this.numbers);
        storage.set('background', document.querySelector('.game_cell').style.background);
        storage.set('initialMoves', this.initialMoves);
        this.timer.stopTimer();
    }

    // конец игры - добавить рекорды и запрет на дальнейшие действия
    endGame() {
        this.timer.stopTimer();
        this.addScore();
    }

    createBestScores() {
        for (let i = 3; i < 9; i++) {
            this.bestScores[i] = storage.get('bestScores') != null ? storage.get('bestScores')[i] : [];
        }
        storage.set('bestScores', this.bestScores);
    }

    addScore() {
        const score = this.countMoves + (this.mins * 60) + this.secs;
        if (this.bestScores[this.fieldSize].length < 10) {
            this.bestScores[this.fieldSize].push([this.countMoves, this.mins, this.secs, score]);
            this.bestScores[this.fieldSize].sort((elem1, elem2) => elem1[3] - elem2[3]);
            storage.set('bestScores', this.bestScores);
        } else if (this.score < this.bestScores[this.fieldSize][3]) {
            this.bestScores[this.fieldSize].push([this.countMoves, this.mins, this.secs, score]);
            this.bestScores[this.fieldSize].sort((elem1, elem2) => elem1[3] - elem2[3]);
            this.bestScores[this.fieldSize].pop();
            storage.set('bestScores', this.bestScores);
        }
    }
}