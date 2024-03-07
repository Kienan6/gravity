import Vector2d from "../common/vector";
import DefaultComponent from "../component/defaults/component";
import { GameObject, Scene } from "../component/defaults/types";
import { Collider } from "./types";

//TODO - reduce scene objects to some kind of spacial data tree
//https://github.com/sevdanski/SAT_JS/blob/main/src/js/sat.js
//TODO - use instance of to get type of object??
class SatCollider extends DefaultComponent implements Collider<GameObject> {
  collisions: GameObject[];
  scene: Scene;
  test: number = 0;

  constructor(scene: Scene) {
    super("sat-collider");
    this.scene = scene;
  }

  initialize(): void {}

  getCollisions(): GameObject[] {
    return this.collisions;
  }

  getAxes(vertices: Vector2d[]): Vector2d[] {
    const axes: Vector2d[] = [];
    vertices.forEach((v, i) => {
      //grab next vertex
      const v2 = vertices[i + 1 === vertices.length ? 0 : i + 1];
      const edge = v2.subtract(v);
      const normal = edge.perpendicular();
      axes.push(normal.normalize());
    });
    return axes;
  }

  getProjection(axis: Vector2d, vertices: Vector2d[]): Vector2d {
    let min: number = axis.dotProduct(vertices[0]);
    let max: number = min;
    vertices.forEach((v) => {
      const dot = axis.dotProduct(v);
      if (dot < min) {
        min = dot;
      } else if (dot > max) {
        max = dot;
      }
    });
    return new Vector2d(min, max);
  }

  overlap(p1: Vector2d, p2: Vector2d): boolean {
    const amin = p1.getX();
    const amax = p1.getY();
    const bmin = p2.getX();
    const bmax = p2.getY();

    if ((amin <= bmax && amin >= bmin) || (bmin <= amax && bmin >= amin)) {
      return true;
    }
    return false;
  }

  satCollisionTest(obj1: GameObject, obj2: GameObject): boolean {
    let collided = true;
    const obj1Vertices = obj1
      .getVertices()
      .map((v) => obj1.getTransform().transformVector(v, obj1.getPos()));
    //multiple by its transform somehow
    const obj2Vertices = obj2
      .getVertices()
      .map((v) => obj2.getTransform().transformVector(v, obj2.getPos()));

    const axesObj1 = this.getAxes(obj1Vertices);
    const axesObj2 = this.getAxes(obj2Vertices);

    axesObj1.forEach((a) => {
      // project vertices onto axis
      const p1 = this.getProjection(a, obj1Vertices);
      const p2 = this.getProjection(a, obj2Vertices);
      if (!this.overlap(p1, p2)) {
        collided = false;
        return;
      }
    });

    axesObj2.forEach((a) => {
      //   // project vertices onto axis
      const p1 = this.getProjection(a, obj1Vertices);
      const p2 = this.getProjection(a, obj2Vertices);
      if (!this.overlap(p1, p2)) {
        collided = false;
        return;
      }
    });
    return collided;
  }

  fixedUpdate(): void {
    const obj = this.scene.getGameObjectByTag<GameObject>("test-obj-2");
    if (this.satCollisionTest(this.gameObject, obj)) {
      console.log("collided");
      this.gameObject.onCollisionEnter({
        collidingObject: obj,
      });
    }
  }
}

export default SatCollider;
