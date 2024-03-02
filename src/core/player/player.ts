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
  collisions: CollisionInfo[];
  minMass: number;
  isDead: boolean;
  onMassMechanics: Mechanic<GameObject>;
  onCollisionMechanics: Mechanic<CollisionMechanicCtx>;

  constructor(renderer: Renderer, scene: Scene, params: DefaultPlayerParams) {
    super(`player${params.isSelf ? "-self" : ""}`, scene);
    this.renderer = renderer;
    this.x = params.startX;
    this.y = params.startY;
    this.components = [];
    this.color = params.color;
    this.originalColor = params.color;
    this.collisions = [];
    this.mass = params.mass;
    this.scaleFn = params.scaleFn;
    this.radius = this.scaleFn(params.mass);
    this.minMass = params.minMass;
  }

  initialize(): void {
    this.onMassMechanics = new ColliderSizeMechanic(this.scaleFn);
    this.onCollisionMechanics = new CollisionMassMechanic();
  }

  setMass(mass: number): void {
    this.mass = mass;
    this.radius = this.scaleFn(this.mass);
    this.onMassMechanics.handle(this);
  }

  onCollisionEnter(collision: CollisionInfo): void {
    this.collisions.push(collision);
    this.onCollisionMechanics.handle({
      collision: collision,
      object: this,
    });
    this.color = "#32a889";
  }

  onCollisionExit(collision: CollisionInfo): void {
    this.collisions.splice(this.collisions.indexOf(collision), 1);
    if (this.collisions.length === 0) {
      this.color = this.originalColor;
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

  update(time: number) {
    if (this.mass <= this.minMass) {
      this.onDeath();
    }
    this.renderer.createCircle(this.x, this.y, this.radius, this.color);

    this.updateComponents(time);
  }
}

export default DefaultPlayer;
