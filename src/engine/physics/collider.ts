import DefaultComponent from "../component/defaults/component";
import { GameObject, Scene } from "../component/defaults/types";
import { CircleObject } from "../component/types";
import { CircleCollider } from "./types";

// interface CircleColliderParams {
//   distFn: (o: GameObject) => number;
// }

class DefaultCircleCollider extends DefaultComponent implements CircleCollider {
  scene: Scene;
  radius: number;
  filterTag: string;
  collisions: GameObject[];

  constructor(scene: Scene, initialRadius: number, tag: string) {
    super("circle-collider");
    this.scene = scene;
    this.filterTag = tag;
    this.collisions = [];
    this.radius = initialRadius;
  }

  getRadius() {
    return this.radius;
  }

  setRadius(r: number) {
    this.radius = r;
  }

  fixedUpdate(): void {
    //very naive approach to collision
    if (this.gameObject) {
      //matching tags
      const filteredItems = this.scene.getGameObjectsByTag<CircleObject>(
        this.filterTag,
      );

      filteredItems.forEach((o) => {
        const distX = this.gameObject.getX() - o.getX();
        const distY = this.gameObject.getY() - o.getY();

        const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

        if (distance <= this.radius + o.getRadius()) {
          if (!this.collisions.includes(o)) {
            this.collisions.push(o);
            this.gameObject.onCollisionEnter({
              collidingObject: o,
            });
          }
        } else if (this.collisions.includes(o)) {
          this.collisions.splice(this.collisions.indexOf(o), 1);
          this.gameObject.onCollisionExit({
            collidingObject: o,
          });
        }
      });
    }
  }
}

export default DefaultCircleCollider;
