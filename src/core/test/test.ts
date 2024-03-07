import { Scene } from "../../engine/component/defaults/types";
import RectangleGameObject from "../../engine/component/rectangle";
import { CollisionInfo } from "../../engine/physics/types";

class TestObj extends RectangleGameObject {
  constructor(scene: Scene, x: number, y: number, id: string) {
    super(50, 50, x, y, `test-obj-${id}`, scene);
  }

  initialize(): void {
    // this.setX((Math.random() * this.scene.getRenderer().getWidth()) / 2);
    // this.setY((Math.random() * this.scene.getRenderer().getHeight()) / 2);
  }

  fixedUpdate(): void {
    this.updateFixedComponents();
  }

  update(time: number): void {
    this.updateComponents(time);
  }
}

export default TestObj;
