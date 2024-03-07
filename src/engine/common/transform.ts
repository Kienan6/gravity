import { Scene } from "../component/defaults/types";
import Vector2d from "./vector";

class Transform2d {
  scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene;
  }
  //local to scene space
  transformVector(vec: Vector2d, pos: Vector2d): Vector2d {
    return vec.add(pos);
  }
}

export default Transform2d;
