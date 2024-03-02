export type MechanicHandler<T> = (ctx: T, next?: () => void) => void;

export interface IMechanicChain<T> {
  use(mechanic: MechanicHandler<T>): void;
  start(): void;
}

export interface Mechanic<T> {
  getNext(): Mechanic<T>;
  setNext(m: Mechanic<T>): void;
  handle(ctx: T): void;
  process(ctx: T): void;
}
