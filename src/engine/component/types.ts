import { GameObject } from "./defaults/types";

export interface CircleObject extends GameObject {
  getRadius(): number;
  setRadius(r: number): void;
}
