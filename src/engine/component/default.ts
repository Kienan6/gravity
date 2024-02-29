import { CollisionInfo } from "../physics/types";
import { GameObject } from "./types";

//default game object class that most if not all game objects extend
abstract class DefaultGameObject implements GameObject {
  components: GameObject[];
  parent: GameObject;
  tag: string;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  mass: number;

  constructor(tag: string) {
    console.log(`Initialized ${tag}`);
    this.tag = tag;
    this.components = [];
    this.velocity = { x: 0, y: 0 };
    this.mass = 0;
  }

  initialize() {
    return;
  }

  getX(): number {
    return this.x;
  }

  setX(x: number) {
    this.x = x;
  }

  getY(): number {
    return this.y;
  }

  setY(y: number) {
    this.y = y;
  }

  getTag(): string {
    return this.tag;
  }

  setMass(mass: number) {
    this.mass = mass;
  }

  getMass() {
    return this.mass;
  }

  getVelocity() {
    return this.velocity;
  }

  setVelocity(x: number, y: number) {
    this.velocity = { x, y };
  }

  fixedUpdate() {
    return;
  }

  update(time: number) {
    return;
  }

  getComponentsByTag(tag: string): GameObject[] {
    return this.components.filter((c) => c.getTag() === tag);
  }

  onCollisionEnter(collision: CollisionInfo) {}

  onCollisionExit(collision: CollisionInfo) {}

  setParent(parent: GameObject) {
    this.parent = parent;
  }

  getParent() {
    return this.parent;
  }
  //TODO - another limitation
  updateFixedComponents() {
    this.components.forEach((c) => c.fixedUpdate());
  }

  //TODO - current limitation this must be called
  updateComponents(time: number) {
    this.components.forEach((c) => c.update(time));
  }

  addComponent(component: GameObject) {
    component.setParent(this);
    component.initialize();
    this.components.push(component);
  }

  addComponents(components: GameObject[]) {
    components.forEach((c) => {
      this.addComponent(c);
    });
  }
}

export default DefaultGameObject;
