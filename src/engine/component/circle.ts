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

  //default impl
  draw(): void {
    this.getRenderer().createCircle(
      this.pos.getX(),
      this.pos.getY(),
      this.radius,
      "#00ff22",
    );
  }
}

export default CircleGameObject;
