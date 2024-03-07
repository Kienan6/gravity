import CircleGameObject from "../../engine/component/circle";
import { GameObject, Scene } from "../../engine/component/defaults/types";
import { CircleCollider, CollisionInfo } from "../../engine/physics/types";
import { Renderer } from "../../engine/renderer/types";
import CollisionMechanic, {
  CollisionMechanicCtx,
} from "../mechanics/collision_ mass";
import MassMechanic from "../mechanics/collider_ size";
import { Mechanic } from "../mechanics/types";
import { Player } from "./types";
import CollisionMassMechanic from "../mechanics/collision_ mass";
import ColliderSizeMechanic from "../mechanics/collider_ size";
import { scaleFn } from "../../engine/common/types";

interface DefaultPlayerParams {
  startX: number;
  startY: number;
  color: string;
  mass: number;
  minMass: number;
  scaleFn: scaleFn;
  isSelf?: boolean;
}

//TODO create visual class with draw method and add to gameobject
class DefaultPlayer extends CircleGameObject implements Player {
  renderer: Renderer;
  color: string;
  originalColor: string;
  mass: number;
  scaleFn: scaleFn;
  minMass: number;
  isDead: boolean;
  onMassMechanics: Mechanic<GameObject>;
  onCollisionMechanics: Mechanic<CollisionMechanicCtx>;

  constructor(renderer: Renderer, scene: Scene, params: DefaultPlayerParams) {
    super(`player${params.isSelf ? "-self" : ""}`, scene);
    this.renderer = renderer;
    this.setX(params.startX);
    this.setY(params.startY);
    this.components = [];
    this.color = params.color;
    this.originalColor = params.color;
    this.mass = params.mass;
    this.scaleFn = params.scaleFn;
    this.radius = this.scaleFn(params.mass);
    this.minMass = params.minMass;
  }

  initialize(): void {
    this.onMassMechanics = new ColliderSizeMechanic();
    this.onCollisionMechanics = new CollisionMassMechanic();
  }

  setMass(mass: number): void {
    this.mass = mass;
    this.radius = this.scaleFn(this.mass);
    this.onMassMechanics.handle(this);
  }

  onCollisionEnter(collision: CollisionInfo): void {
    this.onCollisionMechanics.handle({
      collision: collision,
      object: this,
    });
    this.color = "#32a889";
  }

  onCollisionExit(collision: CollisionInfo): void {
    const collider = this.getComponentByTag<CircleCollider>("circle-collider");
    if (collider) {
      if (collider.getCollisions().length === 0) {
        this.color = this.originalColor;
      }
    }
  }

  onDeath() {
    this.destroy();
  }
  onSpawn: () => void;
  onContact() {}

  fixedUpdate(): void {
    this.updateFixedComponents();
  }

  draw(): void {
    this.renderer.createCircle(
      this.getX(),
      this.getY(),
      this.radius,
      this.color,
    );
  }

  update(time: number) {
    if (this.mass <= this.minMass) {
      this.onDeath();
    }

    this.updateComponents(time);
  }
}

export default DefaultPlayer;
