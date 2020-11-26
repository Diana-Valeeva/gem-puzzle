/* eslint-disable no-sequences */
/* eslint-disable import/extensions */
import create from './create.js';

export default class GameField {
    constructor(fieldSize, numbers) {
        this.fieldSize = fieldSize,
        this.cells = [],
        this.numbers = numbers;
    }

    createField() {
        this.field = create('div', 'game_field', null, document.querySelector('main'));
        for (let i = 0; i < this.fieldSize ** 2; i++) {
            const cell = create('div', 'game_cell', null, this.field, ['draggable', 'true']);
            cell.innerText = this.numbers[i];
            const column = i % this.fieldSize;
            const row = (i - column) / this.fieldSize;
            cell.style.top = `${row * (+this.field.offsetWidth) / this.fieldSize + row}px`;
            cell.style.left = `${column * (+this.field.offsetWidth) / this.fieldSize + column}px`;
            cell.style.width = `${this.field.offsetWidth / this.fieldSize}px `;
            cell.style.height = `${this.field.offsetWidth / this.fieldSize}px `;
            if (cell.innerText === '0') {
                cell.style.visibility = 'hidden';
            }
            this.cells.push({
                column,
                row,
                element: cell,
                value: this.numbers[i],
            });
        }
        this.sound = create('audio', 'game_cell_sound', null, document.querySelector('main'), ['src', '../../assets/audio.wav']);
    }

    getEmpty() {
        return this.cells.find((elem) => elem.value === 0);
    }

    setBackground(url) {
        document.querySelectorAll('.game_cell').forEach((cell) => {
            const column = (cell.textContent - 1) % this.fieldSize;
            const row = (cell.textContent - 1 - column) / this.fieldSize;
            cell.style.background = url;
            cell.style.backgroundSize = `${100 * this.fieldSize}%`;
            cell.style.backgroundPosition = `${100 / (this.fieldSize - 1) * column}% 
                ${100 / (this.fieldSize - 1) * row}%`;
        });
    }
}

// 'url(\'../assets/100.jpg\')';