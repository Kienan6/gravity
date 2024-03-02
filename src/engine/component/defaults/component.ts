import { Component, GameObject } from "./types";

class DefaultComponent implements Component {
  gameObject: GameObject;
  tag: string;

  constructor(tag: string) {
    this.tag = tag;
  }
  uniqueFnName(): string {
    throw new Error("Method not implemented.");
  }

  initialize() {}

  getGameObject(): GameObject {
    return this.gameObject;
  }
  setGameObject(obj: GameObject): void {
    this.gameObject = obj;
  }

  update(time: number): void {
    return;
  }
  fixedUpdate(): void {
    return;
  }
  getTag(): string {
    return this.tag;
  }
}

export default DefaultComponent;
