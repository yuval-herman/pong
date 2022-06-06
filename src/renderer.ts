import { vector } from "./vector";

export enum objTypes {
	ball,
	paddle,
}

export interface renderer {
	objects: Object;
	make(name: string, type: objTypes, height: number, width: number): void;
	move(name: string, position: vector): void;
}