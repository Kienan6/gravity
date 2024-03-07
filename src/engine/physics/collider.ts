import DefaultComponent from "../component/defaults/component";
import { Scene } from "../component/defaults/types";
import { CircleObject } from "../component/types";
import { CircleCollider } from "./types";

//circle circle collisions

//TODO - broad detection algorithm on the scene instead of passing the entire scene
// Should work fine with small number of scene objects
class DefaultCircleCollider extends DefaultComponent implements CircleCollider {
  scene: Scene;
  radius: number;
  filterTag: string;
  collisions: CircleObject[];

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

  getCollisions(): CircleObject[] {
    return this.collisions;
  }

  checkForRemovedItems() {
    const toRemoveIndices: number[] = [];
    const items = this.scene.getGameObjectsByTag<CircleObject>(this.filterTag);
    this.collisions.forEach((c, i) => {
      //collision item is no longer in scene
      if (!items.includes(c)) {
        toRemoveIndices.push(i);
      }
    });

    //remove
    toRemoveIndices.forEach((index) => {
      this.collisions.splice(index, 1);
      //call proper exit
      this.gameObject.onCollisionExit({
        collidingObject: this.collisions[index],
      });
    });
  }

  fixedUpdate(): void {
    //very naive approach to collision
    if (this.gameObject) {
      this.checkForRemovedItems();
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
