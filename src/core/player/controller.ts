import DefaultGameObject from "../../engine/component/default";

class PlayerController extends DefaultGameObject {
    movement: {x: number, y: number}
    speed: number;

    constructor() {
        super("player-controller")
        this.speed = 0.5 // m/s
        this.movement = {x: 0, y: 0}
    }
    //TODO - switch case - handle double inputs
    initialize() {
        window.addEventListener("keydown", (e) => {
            if(e.code === "KeyW") {
                this.movement = {x: this.movement.x, y: 1}
            }
            if(e.code === "KeyS") {
                this.movement = {x: this.movement.x, y: -1}
            }
            if(e.code === "KeyD") {
                this.movement = {x: 1, y: this.movement.y}
            }
            if(e.code === "KeyA") {
                this.movement = {x: -1, y: this.movement.y}
            }
        })

        window.addEventListener("keyup", (e) => {
            if(e.code === "KeyW") {
                this.movement = {x: this.movement.x, y: 0}
            }
            if(e.code === "KeyS") {
                this.movement = {x: this.movement.x, y: 0}
            }
            if(e.code === "KeyD") {
                this.movement = {x: 0, y: this.movement.y}
            }
            if(e.code === "KeyA") {
                this.movement = {x: 0, y: this.movement.y}
            }
        })
    }

    update(time: number) {
        if(this.movement.y === 1) {
            this.parent.setY(this.parent.getY()-(this.speed * time))
        } else if (this.movement.y === -1) {
            this.parent.setY(this.parent.getY() + (this.speed * time))
        }

        if(this.movement.x === 1) {
            this.parent.setX(this.parent.getX() + (this.speed * time))
        } else if (this.movement.x === -1) {
            this.parent.setX(this.parent.getX() - (this.speed * time))
        }
    }
}

export default PlayerController;