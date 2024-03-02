import { CollisionInfo } from "../../physics/types";
import { Renderer } from "../../renderer/types";

type Constructor<T> = new (...args: any[]) => T;

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
  getVelocity(): { x: number; y: number };
  setVelocity(x: number, y: number): void;
  onCollisionEnter: (collision: CollisionInfo) => void;
  onCollisionExit: (collision: CollisionInfo) => void;
  getX(): number;
  setX(x: number): void;
  getY(): number;
  setY(y: number): void;
}

//in world game object
export interface GameObject extends LifeCycle, PhysicalObject, Taggable {
  addComponent: (component: Component) => void;
  removeComponentByTag: (tag: string) => void;
  getComponentByTag<T>(tag: string): T;
  getComponentsByTag(tag: string): Component[];
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
