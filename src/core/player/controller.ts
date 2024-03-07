import Vector2d from "../../engine/common/vector";
import DefaultComponent from "../../engine/component/defaults/component";

class PlayerController extends DefaultComponent {
  movement: Vector2d;
  speed: number;

  constructor() {
    super("player-controller");
    this.movement = new Vector2d(0, 0);
    this.speed = 50; //m/s
  }
  //TODO - switch case - handle double inputs
  initialize() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyW") {
        this.movement.setY(-1);
      }
      if (e.code === "KeyS") {
        this.movement.setY(1);
      }
      if (e.code === "KeyD") {
        this.movement.setX(1);
      }
      if (e.code === "KeyA") {
        this.movement.setX(-1);
      }
      if (e.code === "ShiftLeft") {
        this.speed = 80;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "KeyW" || e.code === "KeyS") {
        this.movement.setY(0);
      }
      if (e.code === "KeyD" || e.code === "KeyA") {
        this.movement.setX(0);
      }
      if (e.code === "ShiftLeft") {
        this.speed = 50;
      }
    });
  }

  update(time: number) {
    const newVel = this.gameObject.getVelocity();
    if (this.movement.y === 1) {
      newVel.setY(-this.speed);
    } else if (this.movement.y === -1) {
      newVel.setY(this.speed);
    }

    if (this.movement.x === 1) {
      newVel.setX(this.speed);
    } else if (this.movement.x === -1) {
      newVel.setX(-this.speed);
    }

    if (this.movement.x === 0) {
      newVel.setX(0);
    }
    if (this.movement.y === 0) {
      newVel.setY(0);
    }
  }
}

export default PlayerController;
