import { GameObject } from "../../engine/component/types";

export interface Player {
    onDeath: () => void;
    onSpawn: () => void;
    onContact: () => void;
    getRadius: () => number;
}
