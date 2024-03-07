import Vector2d from "../common/vector";
import DefaultGameObject from "./defaults/object";
import { Scene } from "./defaults/types";
import { RectangleObject } from "./types";

//TODO handle rotation in game objects
class RectangleGameObject extends DefaultGameObject implements RectangleObject {
  height: number;
  width: number;
  constructor(
    height: number,
    width: number,
    x: number,
    y: number,
    tag: string,
    scene: Scene,
  ) {
    super(tag, scene);
    this.height = height;
    this.width = width;
    this.setX(x);
    this.setY(y);
  }
  getHeight(): number {
    return this.height;
  }
  getWidth(): number {
    return this.width;
  }
  setHeight(h: number): void {
    this.height = h;
  }
  setWidth(w: number): void {
    this.width = w;
  }

  //local space - not efficient
  getVertices(): Vector2d[] {
    return [
      new Vector2d(this.width / 2, this.height / 2), //top left
      new Vector2d(this.width / 2, -this.height / 2), //top right
      new Vector2d(-this.width / 2, -this.height / 2), //bottom right
      new Vector2d(-this.width / 2, this.height / 2), //bottom left
    ];
  }

  //default impl
  //todo - get pos on game object return a vector
  draw(): void {
    const worldVertices = this.getVertices().map((v) =>
      this.transform.transformVector(v, new Vector2d(this.getX(), this.getY())),
    );
    worldVertices.forEach((v, i) => {
      const v2 = worldVertices[i + 1 === worldVertices.length ? 0 : i + 1];
      this.getRenderer().createLine(v, v2);
    });
    // this.getRenderer().createRectangle(
    //   this.x,
    //   this.y,
    //   this.width,
    //   this.height,
    //   "#0022ff",
    // );
  }
}

export default RectangleGameObject;
