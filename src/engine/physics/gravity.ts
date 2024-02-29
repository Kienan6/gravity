import DefaultGameObject from "../component/default";

class GravityPhysics extends DefaultGameObject {
  gravity: number;
  time: number = 6.6 / 1000;
  constructor() {
    super("physics-gravity");
    this.gravity = 9.8; //9.8 m/s^2
  }

  update(time: number) {
    const timeInSec = time / 1000;
    //apply gravity to each component
    this.components.forEach((c) => {
      const velY = c.getVelocity().y - this.gravity * timeInSec;
      c.setVelocity(c.getVelocity().x, velY);
      const newY =
        c.getVelocity().y * timeInSec -
        (1 / 2) * (this.gravity * Math.pow(this.time, 2));
      c.setY(newY);
    });
  }
}

export default GravityPhysics;
