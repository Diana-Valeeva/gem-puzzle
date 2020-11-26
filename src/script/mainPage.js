/* eslint-disable import/extensions */
import create from './create.js';
// create(tag, classNames, child, parent, ...dataAttr)

export default class MainPage {
    createInnerHtml() {
        this.main = create('main', 'main');
        document.querySelector('body').prepend(this.main);
        this.head = create('h1', 'head', null, this.main);
        this.header = create('div', 'header', null, this.main);
        this.head.innerText = 'Gem Puzzle';
        this.newGameCont = create('div', 'new-game__container', null, this.header);
        this.selectionList = create('select', 'field-sizes', null, this.newGameCont, ['name', 'selectList']);

        for (let i = 3; i < 9; i++) {
            const listOption = create('option', 'size', null, this.selectionList);

            listOption.value = i;
            listOption.text = `${i} * ${i}`;
        }

        this.selectionList.options.selectedIndex = 1;
        this.newGameBtn = create('button', 'new-game__button', create('i', 'material-icons', 'cached'), this.newGameCont);
        this.time = create('div', 'timer', [
            create('i', 'material-icons', 'timer'),
            create('span', 'time', '00 : 00'),
        ], this.header);
        this.moves = create('div', 'moves', [
            create('i', 'material-icons', 'swap_horiz'),
            create('span', 'count_moves', '0'),
        ], this.header);
        this.pause = create('button', 'pause-game__button', create('i', 'material-icons', 'pause'), this.header);
    }
}