import DefaultComponent from "../../engine/component/defaults/component";
import { Mechanic } from "./types";

class DefaultMechanic<T> extends DefaultComponent implements Mechanic<T> {
  nextMechanic: Mechanic<T>;
  constructor(tag: string) {
    super(tag);
  }
  getNext(): Mechanic<T> {
    return this.nextMechanic;
  }

  setNext(m: Mechanic<T>): void {
    this.nextMechanic = m;
  }

  handle(ctx: T): void {
    this.process(ctx);
    if (this.nextMechanic) {
      this.nextMechanic.handle(ctx);
    }
  }

  process(ctx: T): void {}
}

export default DefaultMechanic;
