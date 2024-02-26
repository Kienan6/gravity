import { Renderer } from "./types";

class CanvasRenderer implements Renderer {
    canvas: HTMLCanvasElement;
    height: number;
    width: number;
    defaultElement: string;

    constructor(defaultElement: string, width: number, height: number) {
        this.defaultElement = defaultElement
        this.width = width
        this.height = height
    }

    createView() {
        const root = document.getElementById(this.defaultElement)

        this.canvas = document.createElement("canvas")
        this.canvas.id = "game-view"
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.canvas.style.zIndex = "8"
        this.canvas.style.border = "1px solid black"

        root.appendChild(this.canvas)
    }

    clear() {
        const ctx = this.canvas.getContext("2d")
        ctx.clearRect(0, 0, this.width, this.height);
    }

    createCircle(x: number, y: number, radius: number, fill: string) {
        const ctx = this.canvas.getContext("2d")
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fillStyle = fill
        ctx.fill()
    }

    createRectangle(x: number, y: number, width: number, height: number, fill: string) {
        const ctx = this.canvas.getContext("2d")
        ctx.beginPath()
        ctx.rect(x, y, width, height)
        ctx.fillStyle = fill
        ctx.fill()
    }

}

export default CanvasRenderer;