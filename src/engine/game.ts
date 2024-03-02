import { GameObject, LifeCycle } from "./component/defaults/types";
import { Renderer } from "./renderer/types";

//TODO - Add a time class thats updated by the main gameloop
class Game {
  renderer: Renderer;
  objects: LifeCycle[];
  lastRender: number;
  lastFixed: number;
  frameRateMs: number;
  fixedRateMs: number;

  constructor(renderer: Renderer, objects: GameObject[]) {
    console.log("Creating game");
    this.renderer = renderer;
    this.objects = objects;
    this.lastRender = 0;
    this.lastFixed = 0;
    this.frameRateMs = (1 / 120) * 1000;
    this.fixedRateMs = (1 / 60) * 1000;
    window.requestAnimationFrame((t) => this.gameLoop(t));
  }

  addObject(obj: LifeCycle) {
    obj.initialize();
    this.objects.push(obj);
  }

  addObjects(obj: LifeCycle[]) {
    obj.forEach((o) => {
      o.initialize();
    });
    this.objects.push(...obj);
  }

  gameLoop(timestamp: number) {
    const time = timestamp - this.lastRender;
    const timeFixed = timestamp - this.lastFixed;
    //roughly once every 1/60 of a second
    if (time >= this.frameRateMs) {
      this.renderer.clear();
      this.objects.forEach((o) => {
        o.update(time);
      });
      this.lastRender = timestamp;
    }
    // 60 hertz TODO - very hackable
    if (timeFixed >= this.fixedRateMs) {
      this.objects.forEach((o) => {
        o.fixedUpdate();
      });
    }
    window.requestAnimationFrame((t) => this.gameLoop(t));
  }
}

export default Game;
