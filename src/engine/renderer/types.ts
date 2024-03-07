import Vector2d from "../common/vector";

export interface Renderer {
  createView: () => void;
  clear: () => void;
  createCircle: (x: number, y: number, radius: number, fill: string) => void;
  createRectangle: (
    x: number,
    y: number,
    width: number,
    height: number,
    fill: string,
  ) => void;
  createLine(start: Vector2d, end: Vector2d): void;
  getHeight: () => number;
  getWidth: () => number;
}
