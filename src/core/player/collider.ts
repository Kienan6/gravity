import DefaultGameObject from "../../engine/component/default";
import { GameObject } from "../../engine/component/types";
import CircleCollider from "../../engine/physics/collider";
import { CollisionInfo } from "../../engine/physics/types";
import DefaultMap from "../map/map";

class PlayerCollider extends DefaultGameObject {
  map: DefaultMap;
  playerSize: number;

  constructor(map: DefaultMap, size: number) {
    super("player-collision");
    this.map = map;
    this.playerSize = size;
  }

  initialize() {
    //initialize position
    this.setX(this.parent.getX());
    this.setY(this.parent.getY());

    const collider = new CircleCollider(
      this,
      this.map.components,
      this.playerSize,
      ["player"],
    );
    this.addComponent(collider);
  }

  onCollisionEnter(collision: CollisionInfo): void {
    this.parent.onCollisionEnter(collision);
  }

  onCollisionExit(collision: CollisionInfo): void {
    this.parent.onCollisionExit(collision);
  }

  fixedUpdate(): void {
    this.updateFixedComponents();
  }
  update(time: number) {
    //track the parent
    this.setX(this.parent.getX());
    this.setY(this.parent.getY());
  }
}

export default PlayerCollider;
