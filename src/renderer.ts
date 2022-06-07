/* eslint-disable @typescript-eslint/ban-types */
import { Box } from "./helpers";
import { vector } from "./vector";

export enum objTypes {
  ball,
  paddle,
}

export interface Renderer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  map: Map<string, Object>;
  make(name: string, type: objTypes, height: number, width: number): void;
  move(name: string, position: vector): void;

  setInterval(fn: Function, ms: number): void;
  stopInterval(): void;
  getField(): Box;
}

export class dummyRenderer implements Renderer {
  map: Map<string, Object>;
  intervalId = 0;

  constructor() {
    this.map = new Map<string, Object>();
  }
  move(name: string, position: vector): void {
    console.log("move", name, position);
  }
  make(name: string, type: objTypes, height: number, width: number): void {
    console.log("make", name, type, height, width);
  }
  setInterval(fn: Function, ms: number) {
    this.intervalId = setInterval(fn, ms);
  }
  stopInterval() {
    clearInterval(this.intervalId);
  }

  getField(): Box {
    return [new vector(0, 0), new vector(100, 100)];
  }
}
