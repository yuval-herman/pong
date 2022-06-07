import { vector } from "./vector";

export enum objTypes {
	ball,
	paddle,
}

export interface Renderer {
	objects: Object;
	make(name: string, type: objTypes, height: number, width: number): void;
	move(name: string, position: vector): void;
}

export class dummyRenderer implements Renderer {
	objects: Object = {};
	move(name: string, position: vector): void {
		console.log("move", name, position);
	}
	make(name: string, type: objTypes, height: number, width: number): void {
		console.log("make", name, type, height, width);
	}
}
