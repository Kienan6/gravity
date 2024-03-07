import { GameObject } from "./defaults/types";

export interface CircleObject extends GameObject {
  getRadius(): number;
  setRadius(r: number): void;
}

export interface RectangleObject extends GameObject {
  getHeight(): number;
  setHeight(h: number): void;
  getWidth(): number;
  setWidth(w: number): void;
}
