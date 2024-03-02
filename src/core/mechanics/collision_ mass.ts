import { GameObject } from "../../engine/component/defaults/types";
import { CollisionInfo } from "../../engine/physics/types";
import DefaultMechanic from "./mechanic";

export type CollisionMechanicCtx = {
  object: GameObject;
  collision: CollisionInfo;
};

class CollisionMassMechanic extends DefaultMechanic<CollisionMechanicCtx> {
  constructor() {
    super("collision-mechanic");
  }
  process(ctx: CollisionMechanicCtx): void {
    const obj = ctx.collision.collidingObject;
    const newObjMass = obj.getMass() / 2;
    obj.setMass(newObjMass);
    ctx.object.setMass(ctx.object.getMass() + newObjMass);
  }
}

export default CollisionMassMechanic;
