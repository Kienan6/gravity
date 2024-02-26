import { Renderer } from "./types";

class Sprite {
    renderer: Renderer;
    constructor(renderer: Renderer) {
        this.renderer = renderer
    }

    draw(x: number, y: number) {
        this.renderer.createCircle(x, y, 8, "#ffffff")
    }
}

export default Sprite;