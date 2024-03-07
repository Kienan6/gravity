import DefaultScene from "../../engine/component/defaults/scene";
import RigidBody from "../../engine/physics/rigidbody";
import SatCollider from "../../engine/physics/sat_ collider";
import { Renderer } from "../../engine/renderer/types";
import PlayerController from "../player/controller";
import TestObj from "../test/test";
import Boundary from "./boundary";

const defaultThickness = 2;
class DefaultMap extends DefaultScene {
  renderer: Renderer;

  constructor(renderer: Renderer) {
    super("player-map", renderer);
    this.renderer = renderer;
  }

  initialize(): void {
    // const height = this.getRenderer().getHeight();
    // const width = this.getRenderer().getWidth();
    // const boundaryL = new Boundary(height, defaultThickness, this, "left-wall");
    // const boundaryR = new Boundary(
    //   height,
    //   defaultThickness,
    //   this,
    //   "right-wall",
    // );
    // const boundaryT = new Boundary(defaultThickness, width, this, "top-wall");
    // const boundaryB = new Boundary(
    //   defaultThickness,
    //   width,
    //   this,
    //   "bottom-wall",
    // );
    // boundaryL.setX(0);
    // boundaryL.setY(0);
    // boundaryR.setX(width - defaultThickness);
    // boundaryR.setY(0);
    // boundaryB.setX(0);
    // boundaryB.setY(height - defaultThickness);
    // boundaryT.setX(0);
    // boundaryT.setY(0);
    // this.addGameObject(boundaryL);
    // this.addGameObject(boundaryR);
    // this.addGameObject(boundaryT);
    // this.addGameObject(boundaryB);

    const testObj2 = new TestObj(this, 0, 100, "2");
    const testObj = new TestObj(this, 0, 0, "1");

    this.addGameObject(testObj);
    this.addGameObject(testObj2);

    const rigidBody = new RigidBody();
    const controller = new PlayerController();
    const satCollider = new SatCollider(this);
    testObj.addComponents([rigidBody, controller, satCollider]);
  }
}

export default DefaultMap;
