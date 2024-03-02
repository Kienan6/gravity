import CircleGameObject from "../../engine/component/circle";
import DefaultGameObject from "../../engine/component/defaults/object";
import { Scene } from "../../engine/component/defaults/types";
import { CircleCollider, CollisionInfo } from "../../engine/physics/types";
import { Renderer } from "../../engine/renderer/types";
import { Player } from "./types";

interface DefaultPlayerParams {
  startX: number;
  startY: number;
  color: string;
  mass: number;
  minMass: number;
  scaleFn: scaleFn;
  isSelf?: boolean;
}

class DefaultPlayer extends CircleGameObject implements Player {
  renderer: Renderer;
  color: string;
  originalColor: string;
  mass: number;
  scaleFn: scaleFn;
  collisions: CollisionInfo[];
  minMass: number;
  isDead: boolean;

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
    this.setColliderRadius(this.radius);
  }

  setColliderRadius(r: number): void {
    const collider = this.getComponentByTag<CircleCollider>("circle-collider");
    if (collider) {
      collider.setRadius(r);
    }
  }

  setMass(mass: number): void {
    this.radius = this.scaleFn(mass);
    this.setColliderRadius(this.radius);
    this.mass = mass;
  }

  onCollisionEnter(collision: CollisionInfo): void {
    const obj = collision.collidingObject;
    const newObjMass = obj.getMass() / 2;
    obj.setMass(newObjMass);
    this.setMass(this.getMass() + newObjMass);
    this.collisions.push(collision);
    this.color = "#32a889";
  }

  onCollisionExit(collision: CollisionInfo): void {
    this.collisions.splice(this.collisions.indexOf(collision), 1);
    console.log("exited");
    console.log(collision);
    console.log(this.collisions);
    if (this.collisions.length === 0) {
      this.color = this.originalColor;
    }
  }

  onDeath() {
    console.log("death");
    console.log(this);
    this.destroy();
  }
  onSpawn: () => void;
  onContact() {}

  fixedUpdate(): void {
    this.updateFixedComponents();
  }

  update(time: number) {
    if (!this.isDead) {
      if (this.mass <= this.minMass) {
        this.onDeath();
      }
      this.renderer.createCircle(this.x, this.y, this.radius, this.color);
    }
    this.updateComponents(time);
  }
}

export default DefaultPlayer;
