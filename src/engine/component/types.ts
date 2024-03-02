import DefaultGameObject from "./defaults/object";

export interface CircleObject extends DefaultGameObject {
  getRadius(): number;
  setRadius(r: number): void;
}
