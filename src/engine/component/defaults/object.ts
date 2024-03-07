import Transform2d from "../../common/transform";
import Vector2d from "../../common/vector";
import { CollisionInfo } from "../../physics/types";
import { Renderer } from "../../renderer/types";
import { Component, GameObject, Scene } from "./types";

//default game object class that most if not all game objects extend
abstract class DefaultGameObject implements GameObject {
  components: Component[];
  transform: Transform2d;
  scene: Scene;
  tag: string;
  pos: Vector2d;
  velocity: Vector2d;
  vertices: Vector2d[];
  mass: number;

  constructor(tag: string, scene: Scene) {
    console.log(`Initialized ${tag}`);
    this.tag = tag;
    this.components = [];
    this.velocity = new Vector2d(0, 0);
    this.mass = 0;
    this.scene = scene;
    this.vertices = [];
    this.transform = new Transform2d(scene);
    this.pos = new Vector2d(0, 0);
  }

  initialize() {
    return;
  }
  //todo
  getPos(): Vector2d {
    return this.pos;
  }

  getTransform(): Transform2d {
    return this.transform;
  }

  getScene(): Scene {
    return this.scene;
  }

  setScene(scene: Scene): void {
    this.scene = scene;
  }

  getX(): number {
    return this.pos.x;
  }

  setX(x: number) {
    this.pos.setX(x);
  }

  getY(): number {
    return this.pos.y;
  }

  setY(y: number) {
    this.pos.setY(y);
  }

  getTag(): string {
    return this.tag;
  }

  getVertices(): Vector2d[] {
    return this.vertices;
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

  setVelocity(v: Vector2d) {
    this.velocity = v;
  }

  fixedUpdate() {
    return;
  }

  update(time: number) {
    return;
  }

  draw(): void {
    return;
  }

  getRenderer(): Renderer {
    return this.scene.getRenderer();
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
