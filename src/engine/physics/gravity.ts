import Vector2d from "../common/vector";
import DefaultComponent from "../component/defaults/component";
import { GameObject, PhysicalObject } from "../component/defaults/types";

interface GravityPhysicsParams {
  minDist: number;
  maxDist: number;
  gravity: number;
}

class GravityPhysics extends DefaultComponent {
  time: number = 6.6 / 1000;
  objects: PhysicalObject[];
  params: GravityPhysicsParams;

  constructor(objects: PhysicalObject[], params: GravityPhysicsParams) {
    super("physics-gravity");
    this.objects = objects;
    this.params = params;
  }
  //TODO - vector lib
  update(time: number): void {
    const parentX = this.gameObject.getX();
    const parentY = this.gameObject.getY();
    this.objects.forEach((o) => {
      const distX = parentX - o.getX();
      const distY = parentY - o.getY();
      //euclidian distance
      const dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
      if (dist > this.params.minDist && dist < this.params.maxDist) {
        const force =
          (this.params.gravity * o.getMass() * this.gameObject.getMass()) /
          dist;

        //TODO - apply the force
        const normalX = distX / dist;
        const normalY = distY / dist;

        const accelerationX = (normalX / o.getMass()) * force; //force / mass = acceleration
        const accerationY = (normalY / o.getMass()) * force;
        const newVel = new Vector2d(-accelerationX * time, -accerationY * time);
        o.setVelocity(newVel);
      } else {
        o.setVelocity(new Vector2d(0, 0));
      }
    });
  }
}

export default GravityPhysics;
