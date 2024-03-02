import { Renderer } from "../../renderer/types";
import { GameObject, Scene } from "./types";

class DefaultScene implements Scene {
  tag: string;
  gameObjects: GameObject[];
  renderer: Renderer;

  constructor(tag: string, renderer: Renderer) {
    this.tag = tag;
    this.renderer = renderer;
    this.gameObjects = [];
  }
  initialize() {
    this.gameObjects.forEach((g) => g.initialize());
  }
  update(time: number): void {
    this.gameObjects.forEach((g) => g.update(time));
  }
  fixedUpdate(): void {
    this.gameObjects.forEach((g) => g.fixedUpdate());
  }
  getGameObjects(): GameObject[] {
    return this.gameObjects;
  }
  addGameObject(object: GameObject): void {
    this.gameObjects.push(object);
  }
  removeGameObject(obj: GameObject): void {
    const indexOf = this.gameObjects.findIndex((g) => g === obj);
    if (indexOf > -1) {
      this.gameObjects.splice(indexOf, 1);
    }
  }
  getGameObjectByTag<T = GameObject>(tag: string): T {
    return this.gameObjects.find((o) => o.getTag() === tag) as T;
  }
  getGameObjectsByTag<T = GameObject>(tag: string): T[] {
    return this.gameObjects.filter((o) => o.getTag() === tag) as T[];
  }
  getRenderer(): Renderer {
    return this.renderer;
  }
  getTag(): string {
    return this.tag;
  }
}

export default DefaultScene;
