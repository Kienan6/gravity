import { Scene } from "../../engine/component/defaults/types";
import RectangleGameObject from "../../engine/component/rectangle";
import SatCollider from "../../engine/physics/sat_ collider";
import { CollisionInfo } from "../../engine/physics/types";

class Boundary extends RectangleGameObject {
  scene: Scene;
  constructor(height: number, width: number, scene: Scene, tag: string) {
    super(height, width, 0, 0, tag, scene);
    this.scene = scene;
  }
  initialize(): void {
    const collider = new SatCollider(this.scene);
    this.addComponent(collider);
  }
  onCollisionEnter(collision: CollisionInfo): void {
    console.log(collision);
  }
  //TODO - fix this
  fixedUpdate(): void {
    this.updateFixedComponents();
  }
}

export default Boundary;
