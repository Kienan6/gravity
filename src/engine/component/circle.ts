import DefaultGameObject from "./defaults/object";
import { Scene } from "./defaults/types";
import { CircleObject } from "./types";

class CircleGameObject extends DefaultGameObject implements CircleObject {
  radius: number;
  constructor(tag: string, scene: Scene) {
    super(tag, scene);
  }
  getRadius(): number {
    return this.radius;
  }
  setRadius(r: number): void {
    this.radius = r;
  }
}

export default CircleGameObject;
