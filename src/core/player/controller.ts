import DefaultComponent from "../../engine/component/defaults/component";

class PlayerController extends DefaultComponent {
  movement: { x: number; y: number };
  speed: number;

  constructor() {
    super("player-controller");
    this.movement = { x: 0, y: 0 };
    this.speed = 50; //m/s
  }
  //TODO - switch case - handle double inputs
  initialize() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyW") {
        this.movement = { x: this.movement.x, y: 1 };
      }
      if (e.code === "KeyS") {
        this.movement = { x: this.movement.x, y: -1 };
      }
      if (e.code === "KeyD") {
        this.movement = { x: 1, y: this.movement.y };
      }
      if (e.code === "KeyA") {
        this.movement = { x: -1, y: this.movement.y };
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.code === "KeyW") {
        this.movement = { x: this.movement.x, y: 0 };
      }
      if (e.code === "KeyS") {
        this.movement = { x: this.movement.x, y: 0 };
      }
      if (e.code === "KeyD") {
        this.movement = { x: 0, y: this.movement.y };
      }
      if (e.code === "KeyA") {
        this.movement = { x: 0, y: this.movement.y };
      }
    });
  }

  update(time: number) {
    if (this.movement.y === 1) {
      this.gameObject.setVelocity(this.gameObject.getVelocity().x, -this.speed);
    } else if (this.movement.y === -1) {
      this.gameObject.setVelocity(this.gameObject.getVelocity().x, this.speed);
    }

    if (this.movement.x === 1) {
      this.gameObject.setVelocity(this.speed, this.gameObject.getVelocity().y);
    } else if (this.movement.x === -1) {
      this.gameObject.setVelocity(-this.speed, this.gameObject.getVelocity().y);
    }

    if (this.movement.x === 0) {
      this.gameObject.setVelocity(0, this.gameObject.getVelocity().y);
    }
    if (this.movement.y === 0) {
      this.gameObject.setVelocity(this.gameObject.getVelocity().x, 0);
    }
  }
}

export default PlayerController;
