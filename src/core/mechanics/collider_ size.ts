import { scaleFn } from "../../engine/common/types";
import { CircleObject } from "../../engine/component/types";
import { CircleCollider } from "../../engine/physics/types";
import DefaultMechanic from "./mechanic";

class ColliderSizeMechanic extends DefaultMechanic<CircleObject> {
  constructor() {
    super("mass-mechanic");
  }

  process(ctx: CircleObject): void {
    const collider = ctx.getComponentByTag<CircleCollider>("circle-collider");
    if (collider) {
      collider.setRadius(ctx.getRadius());
    }
  }
}

export default ColliderSizeMechanic;
