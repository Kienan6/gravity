import Vector2d from "../common/vector";
import { Renderer } from "./types";

class CanvasRenderer implements Renderer {
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  defaultElement: string;
  counter: number = 0;

  constructor(defaultElement: string, width: number, height: number) {
    this.defaultElement = defaultElement;
    this.width = width;
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  createView() {
    const root = document.getElementById(this.defaultElement);

    this.canvas = document.createElement("canvas");
    this.canvas.id = "game-view";
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.zIndex = "8";
    this.canvas.style.border = "1px solid black";
    const ctx = this.canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, -1, this.width / 2, this.height / 2);
    root.appendChild(this.canvas);
  }

  clear() {
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(-this.width / 2, -this.height / 2, this.width, this.height);
  }

  getContext() {
    const ctx = this.canvas.getContext("2d");
    return ctx;
  }

  createCircle(x: number, y: number, radius: number, fill: string) {
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  createRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    fill: string,
  ) {
    const ctx = this.getContext();
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = fill;
    ctx.fill();
  }

  createLine(start: Vector2d, end: Vector2d): void {
    const ctx = this.getContext();
    this.counter++;
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = this.counter % 2 === 0 ? "red" : "green";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

export default CanvasRenderer;
