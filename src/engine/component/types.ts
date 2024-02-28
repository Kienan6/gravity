import { CollisionInfo } from "../physics/types";

export interface GameObject {
    addComponent: (component: GameObject) => void;
    initialize: () => void;
    update: (time: number) => void;
    fixedUpdate: () => void;
    onCollisionEnter: (collision: CollisionInfo) => void;
    onCollisionExit: () => void;
    getParent: () => GameObject
    setParent: (parent: GameObject) => void
    getX(): number;
    setX(x: number): void;
    getY(): number;
    setY(y: number): void;
    getTag(): string;
}