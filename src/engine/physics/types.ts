import { GameObject } from "../component/defaults/types";
import { CircleObject } from "../component/types";

export type CollisionInfo = {
  collidingObject: GameObject;
};

export interface Collider<T> {
  getCollisions(): T[];
}

export interface CircleCollider extends Collider<CircleObject> {
  getRadius: () => number;
  setRadius: (r: number) => void;
}
