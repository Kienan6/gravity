import { GameObject } from "../component/defaults/types";

export type CollisionInfo = {
  collidingObject: GameObject;
};

export interface CircleCollider {
  getRadius: () => number;
  setRadius: (r: number) => void;
}
