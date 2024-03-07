import { scaleFn } from "./types";

export function scaleDefault(scale: number): scaleFn {
  return (val: number) => Math.sqrt(val) * scale;
}
