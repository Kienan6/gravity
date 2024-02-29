import DefaultGameObject from "../component/default";
import { GameObject } from "../component/types";

class GravityPhysics extends DefaultGameObject {
  gravity: number;
  time: number = 6.6 / 1000;
  objects: GameObject[];

  constructor(objects: GameObject[]) {
    super("physics-gravity");
    this.gravity = 9.8; //9.8 m/s^2
    this.objects = objects;
  }
  //TODO - vector lib
  update(time: number): void {
    const parentX = this.parent.getX();
    const parentY = this.parent.getY();
    this.objects.forEach((o) => {
      const distX = parentX - o.getX();
      const distY = parentY - o.getY();
      //euclidian distance
      const dist = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
      if (dist > 5 && dist < 400) {
        const force =
          (this.gravity * o.getMass() * this.parent.getMass()) / dist;

        //TODO - apply the force
        const normalX = distX / dist;
        const normalY = distY / dist;

        const accelerationX = (normalX / o.getMass()) * force; //force / mass = acceleration
        const accerationY = (normalY / o.getMass()) * force;

        o.setVelocity(-accelerationX * time, -accerationY * time);
      } else {
        o.setVelocity(0, 0);
      }
    });
  }
}

export default GravityPhysics;
