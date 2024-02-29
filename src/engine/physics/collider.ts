import DefaultGameObject from "../component/default";
import { GameObject } from "../component/types";
import { CollisionInfo } from "./types";

class CircleCollider extends DefaultGameObject {
  space: GameObject[];
  object: GameObject;
  radius: number;
  tags: string[];
  collisions: GameObject[];

  constructor(
    object: GameObject,
    space: GameObject[],
    radius: number,
    tags: string[],
  ) {
    super("player-collider");
    this.space = space;
    this.object = object;
    this.tags = tags;
    this.radius = radius;
    this.collisions = [];
  }

  fixedUpdate(): void {
    //very naive approach to collision
    if (this.object) {
      //matching tags
      const filteredItems = this.space.filter((o) =>
        this.tags.includes(o.getTag()),
      );
      filteredItems.forEach((o) => {
        const distX = this.object.getX() - o.getX();
        const distY = this.object.getY() - o.getY();

        const distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));

        if (distance <= this.radius * 2) {
          if (!this.collisions.includes(o)) {
            this.collisions.push(o);
            this.object.onCollisionEnter({
              collidingObject: o,
            });
          }
        } else if (this.collisions.includes(o)) {
          this.collisions.splice(this.collisions.indexOf(o), 1);
          this.object.onCollisionExit({
            collidingObject: o,
          });
        }
      });
    }
  }
}

export default CircleCollider;
