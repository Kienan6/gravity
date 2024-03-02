import { CollisionInfo } from "../../physics/types";
import { Component, GameObject, Scene } from "./types";

//default game object class that most if not all game objects extend
abstract class DefaultGameObject implements GameObject {
  components: Component[];
  scene: Scene;
  tag: string;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  mass: number;

  constructor(tag: string, scene: Scene) {
    console.log(`Initialized ${tag}`);
    this.tag = tag;
    this.components = [];
    this.velocity = { x: 0, y: 0 };
    this.mass = 0;
    this.scene = scene;
  }

  initialize() {
    return;
  }

  getScene(): Scene {
    return this.scene;
  }

  setScene(scene: Scene): void {
    this.scene = scene;
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

  getComponent<T>(): T {
    return this.components.find((c) => {
      if ((c as T) !== undefined) {
        return c as T;
      }
    }) as T;
  }

  destroy(): void {
    this.scene.removeGameObject(this);
    this.components = [];
  }

  getComponentByTag<T = Component>(tag: string): T {
    return this.components.find((c) => c.getTag() === tag) as T;
  }

  getComponentsByTag(tag: string): Component[] {
    return this.components.filter((c) => c.getTag() === tag);
  }

  onCollisionEnter(collision: CollisionInfo) {}

  onCollisionExit(collision: CollisionInfo) {}

  //TODO - another limitation
  updateFixedComponents() {
    this.components.forEach((c) => c.fixedUpdate());
  }

  //TODO - current limitation this must be called
  updateComponents(time: number) {
    this.components.forEach((c) => c.update(time));
  }

  removeComponentByTag(tag: string) {
    const index = this.components.findIndex((c) => c.getTag() === tag);
    if (index > -1) {
      this.components.splice(index, 1);
    }
  }

  addComponent(component: Component) {
    component.setGameObject(this);
    component.initialize();
    this.components.push(component);
  }

  addComponents(components: Component[]) {
    components.forEach((c) => {
      this.addComponent(c);
    });
  }
}

export default DefaultGameObject;
