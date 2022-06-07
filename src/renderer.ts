import { vector } from "./vector";

export enum objTypes {
	ball,
	paddle,
}

export interface Renderer {
	objects: Object;
	make(name: string, type: objTypes, height: number, width: number): void;
	move(name: string, position: vector): void;
	setInterval(fn: Function, ms: number): void;
	stopInterval(): void;
}

export class dummyRenderer implements Renderer {
	objects: Object = {};
	intervalId: number = 0;
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
}
