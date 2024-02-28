import DefaultGameObject from "../../engine/component/default";
import { CollisionInfo } from "../../engine/physics/types";
import { Renderer } from "../../engine/renderer/types";
import { Player } from "./types";

class DefaultPlayer extends DefaultGameObject implements Player {
  renderer: Renderer;
  radius: number;
  color: string;
  originalColor: string;

  constructor(
    renderer: Renderer,
    startX: number,
    startY: number,
    size: number,
    color: string,
    isSelf?: boolean,
  ) {
    super(`player${isSelf ? "-self" : ""}`);
    this.renderer = renderer;
    this.x = startX;
    this.y = startY;
    this.radius = size;
    this.components = [];
    this.color = color;
    this.originalColor = color;
  }

  getRadius() {
    return this.radius;
  }

  onCollisionEnter(collision: CollisionInfo): void {
    console.log(collision);
    this.color = "#32a889";
  }

  onCollisionExit(): void {
    this.color = this.originalColor;
  }

  onDeath: () => void;
  onSpawn: () => void;
  onContact() {
    this.renderer.createCircle(this.x, this.y, this.radius, this.color);
  }

  fixedUpdate(): void {
    this.updateFixedComponents();
  }

  update(time: number) {
    this.renderer.createCircle(this.x, this.y, this.radius, this.color);
    this.updateComponents(time);
  }
}

export default DefaultPlayer;
