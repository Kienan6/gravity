import { CollisionInfo } from "../physics/types";

export interface GameObject {
  addComponent: (component: GameObject) => void;
  initialize: () => void;
  update: (time: number) => void;
  fixedUpdate: () => void;
  onCollisionEnter: (collision: CollisionInfo) => void;
  onCollisionExit: (collision: CollisionInfo) => void;
  getParent: () => GameObject;
  setParent: (parent: GameObject) => void;
  getComponentsByTag(tag: string): GameObject[];
  getX(): number;
  setX(x: number): void;
  getY(): number;
  setY(y: number): void;
  setMass(mass: number): void;
  getMass(): number;
  getVelocity(): { x: number; y: number };
  setVelocity(x: number, y: number): void;
  getTag(): string;
}
