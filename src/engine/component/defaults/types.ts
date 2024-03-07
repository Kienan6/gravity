import Transform2d from "../../common/transform";
import Vector2d from "../../common/vector";
import Vertex2D from "../../common/vector";
import { CollisionInfo } from "../../physics/types";
import { Renderer } from "../../renderer/types";

export interface Taggable {
  getTag(): string;
}

export interface LifeCycle {
  initialize: () => void;
  update(time: number): void;
  fixedUpdate(): void;
}

export interface PhysicalObject {
  setMass(mass: number): void;
  getMass(): number;
  getVelocity(): Vertex2D;
  setVelocity(vel: Vertex2D): void;
  onCollisionEnter: (collision: CollisionInfo) => void;
  onCollisionExit: (collision: CollisionInfo) => void;
  getVertices(): Vertex2D[];
  getX(): number;
  setX(x: number): void;
  getY(): number;
  setY(y: number): void;
  getPos(): Vector2d;
  getTransform(): Transform2d;
}

//in world game object
export interface GameObject extends LifeCycle, PhysicalObject, Taggable {
  addComponent: (component: Component) => void;
  removeComponentByTag: (tag: string) => void;
  getComponentByTag<T>(tag: string): T;
  getComponentsByTag(tag: string): Component[];
  draw(): void;
  getRenderer(): Renderer;
  getScene(): Scene;
  setScene(scene: Scene): void;
  destroy(): void;
}

//attachable to game objects
export interface Component extends LifeCycle, Taggable {
  getGameObject(): GameObject;
  setGameObject(obj: GameObject): void;
}

export interface Scene extends LifeCycle, Taggable {
  getGameObjects(): GameObject[];
  addGameObject(object: GameObject): void;
  removeGameObject(obj: GameObject): void;
  getGameObjectByTag<T>(tag: string): T;
  getGameObjectsByTag<T>(tag: string): T[];
  getRenderer(): Renderer;
}
