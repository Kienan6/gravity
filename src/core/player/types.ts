import { GameObject } from "../../engine/component/defaults/types";

export interface Player {
  onDeath: () => void;
  onSpawn: () => void;
  onContact: () => void;
}
