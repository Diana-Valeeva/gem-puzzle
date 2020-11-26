/* eslint-disable import/extensions */
import create from './create.js';

export default class EndGameAlert {
    createAlert() {
        this.container = create('div', 'popup hidden game_alert', null, document.querySelector('body'));
        this.menu = create('div', 'menu', null, this.container);
        this.header = create('h2', 'menu_header', null, this.menu);
        this.score = create('p', 'game_alert__score', null, this.menu);
        this.menuList = create('ul', 'menu_list', null, this.menu);
        this.scoresBtn = create('li', 'menu_item new-game', 'new game', this.menuList);
        this.loadBtn = create('li', 'menu_item load', 'load', this.menuList);
        this.scoresBtn = create('li', 'menu_item scores', 'best scores', this.menuList);

        this.menu.style.width = `${document.querySelector('.game_field').offsetWidth + 10}px`;
        this.menu.style.height = `${document.querySelector('.game_field').offsetWidth + 10}px `;
        this.menu.style.left = `${document.querySelector('.game_field').getBoundingClientRect().left - 5}px `;
        this.menu.style.top = `${document.querySelector('.game_field').getBoundingClientRect().top - 5}px`;
        this.menu.style.background = document.querySelector('.game_cell').style.background;
        this.menu.style.backgroundSize = '100%';
    }

    open() {
        this.container.classList.remove('hidden');
    }

    close() {
        this.container.classList.add('hidden');
    }

    setBackground() {
        this.menu.style.background = document.querySelector('.game_cell').style.background;
        this.menu.style.backgroundSize = '100%';
    }
}