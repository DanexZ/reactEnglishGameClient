import { verticalScroll } from "./verticalScroll";

export default class Scrolling {
    pixels
    speed 
    interval

    constructor(pixels: number, speed: number) {
        this.pixels = pixels;
        this.speed = speed;

        this.interval = this.scrolling()
    }


    scrolling() {
        return setInterval(() => verticalScroll(this.pixels), this.speed);
    }

    clear() {
        clearInterval(this.interval);
    }
}