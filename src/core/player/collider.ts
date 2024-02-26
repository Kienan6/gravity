import DefaultGameObject from "../../engine/component/default";
import { GameObject } from "../../engine/component/types";
import CircleCollider from "../../engine/physics/collider";
import { CollisionInfo } from "../../engine/physics/types";
import DefaultMap from "../map/map";

class PlayerCollider extends DefaultGameObject {
    map: DefaultMap
    playerSize: number
    isColliding: boolean
    constructor(map: DefaultMap, size: number) {
        super("player-collision")
        this.map = map
        this.playerSize = size
    }

    initialize() {
        //initialize position
        this.setX(this.parent.getX())
        this.setY(this.parent.getY())

        const collider = new CircleCollider(this, this.map.components, this.playerSize, ["player"])
        this.addComponent(collider)
    }

    onCollision(collision: CollisionInfo): void {
        //TODO - onCollisionEnter onCollisionExit
        if(!this.isColliding) {
            console.log(collision)
            this.parent.onCollision(collision)
            this.isColliding = true;
        }
    }

    fixedUpdate(): void {
        this.updateFixedComponents()
    }
    update(time: number) {
        //track the parent
        this.setX(this.parent.getX())
        this.setY(this.parent.getY())
    }
}

export default PlayerCollider;