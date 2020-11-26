/* eslint-disable import/extensions */
import create from './create.js';
import * as storage from './storage.js';

export default class BestScores {
    createScores() {
        this.container = create('div', 'popup hidden best-scores', null, document.querySelector('body'));
        this.menu = create('div', 'menu', null, this.container);
        this.header = create('h2', 'menu_header', 'BEST SCORES', this.menu);
        this.scoresList = create('ul', 'menu_list', null, this.menu);
        // this.scoresBtn = create('li', 'menu_item new-game', 'new game', this.menuList);
        // this.loadBtn = create('li', 'menu_item load', 'load', this.menuList);
        // this.scoresBtn = create('li', 'menu_item scores', 'best scores', this.menuList);
        this.closeBtn = create('button', 'close__button scores__close', create('i', 'material-icons', 'close'), this.menu);

        this.menu.style.width = `${document.querySelector('.game_field').offsetWidth + 10}px`;
        this.menu.style.height = `${document.querySelector('.game_field').offsetWidth + 10}px `;
        this.menu.style.left = `${document.querySelector('.game_field').getBoundingClientRect().left - 5}px `;
        this.menu.style.top = `${document.querySelector('.game_field').getBoundingClientRect().top - 5}px`;
        this.menu.style.background = document.querySelector('.game_cell').style.background;
        this.menu.style.backgroundSize = '100%';
    }

    open(scoreItem) {
        const scoresStorage = storage.get('bestScores');
        for (let i = 0; i < scoresStorage[scoreItem.toString()].length; i++) {
            create('li', 'menu_item score__item',
                `time ${scoresStorage[scoreItem.toString()][i][1]} : ${scoresStorage[scoreItem.toString()][i][2]}, moves ${scoresStorage[scoreItem.toString()][i][0]}`,
                this.scoresList);
        }

        this.container.classList.remove('hidden');
        this.menu.style.background = document.querySelector('.game_cell').style.background;
        this.menu.style.backgroundSize = '100%';
    }

    close() {
        this.container.classList.add('hidden');
    }
}