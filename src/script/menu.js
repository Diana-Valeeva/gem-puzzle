/* eslint-disable import/extensions */
import create from './create.js';

export default class Menu {
    createMenu() {
        this.container = create('div', 'menu__container popup hidden', null, document.querySelector('body'));
        this.menu = create('div', 'menu', create('h2', 'menu_header', 'PAUSED'), this.container);
        this.closeBtn = create('button', 'close__button', create('i', 'material-icons', 'close'), this.menu);
        this.muteBtn = create('button', 'mute__button', create('i', 'material-icons mute_ico', 'volume_down'), this.menu);
        this.menuList = create('ul', 'menu_list', null, this.menu);
        this.saveBtn = create('li', 'menu_item save', 'save', this.menuList);
        this.loadBtn = create('li', 'menu_item load', 'load', this.menuList);
        this.scoresBtn = create('li', 'menu_item scores', 'best scores', this.menuList);
        this.scoresBtn = create('li', 'menu_item picture', 'change picture', this.menuList);
        this.scoresBtn = create('li', 'menu_item solve', 'give up', this.menuList);
        this.menu.style.width = `${document.querySelector('.game_field').offsetWidth + 10}px`;
        this.menu.style.height = `${document.querySelector('.game_field').offsetWidth + 10}px`;
        this.menu.style.left = `${document.querySelector('.game_field').getBoundingClientRect().left - 5}px`;
        this.menu.style.top = `${document.querySelector('.game_field').getBoundingClientRect().top - 5}px`;
        this.menu.style.background = document.querySelector('.game_cell').style.background;
        this.menu.style.backgroundSize = '100%';
    }

    open() {
        this.menu.style.background = document.querySelector('.game_cell').style.background;
        this.menu.style.backgroundSize = '100%';
        this.container.classList.remove('hidden');
    }

    close() {
        this.container.classList.add('hidden');
    }
}