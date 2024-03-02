import DefaultComponent from "../component/defaults/component";

class RigidBody extends DefaultComponent {
  constructor() {
    super("rigid-body");
  }

  update(time: number): void {
    if (this.gameObject.getVelocity().x !== 0) {
      this.gameObject.setX(
        this.gameObject.getX() + this.gameObject.getVelocity().x * (time / 100),
      );
    }
    if (this.gameObject.getVelocity().y !== 0) {
      this.gameObject.setY(
        this.gameObject.getY() + this.gameObject.getVelocity().y * (time / 100),
      );
    }
  }
}

export default RigidBody;
