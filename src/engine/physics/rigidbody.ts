import DefaultGameObject from "../component/default";

class RigidBody extends DefaultGameObject {
  constructor() {
    super("rigid-body");
  }

  update(time: number): void {
    if (this.parent.getVelocity().x !== 0) {
      this.parent.setX(this.parent.getX() + this.parent.getVelocity().x * time);
    }
    if (this.parent.getVelocity().y !== 0) {
      this.parent.setY(this.parent.getY() + this.parent.getVelocity().y * time);
    }
  }
}

export default RigidBody;
