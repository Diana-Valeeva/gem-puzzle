/* eslint-disable import/extensions */
// import create from './create.js'

export default class Timer {
    constructor(secs = 0, mins = 0) {
        // eslint-disable-next-line no-sequences
        this.secs = secs,
        this.mins = mins,
        this.time = document.querySelector('.time');
    }

    startTimer() {
        this.interval = setInterval(() => {
            this.secs += this.secs;
            if (this.secs >= 60) {
                this.mins += this.mins;
                this.secs -= 60;
            }
            this.setTimer();
        }, 1000);
    }

    setTimer() {
        this.time.innerText = `${this.addZero(this.mins)} : ${this.addZero(this.secs)}`;
    }

    // eslint-disable-next-line class-methods-use-this
    addZero(n) {
        return (parseInt(n, 10) < 10 ? '0' : '') + n;
    }

    stopTimer() {
        clearInterval(this.interval);
    }

    clearTimer() {
        this.secs = 0;
        this.mins = 0;
        this.time.innerText = '00 : 00';
    }
}