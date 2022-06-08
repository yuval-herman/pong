import { vector } from "./vector";

export type Box = [vector, vector];

export function isBetween(num: number, min: number, max: number): boolean {
	return min < num && num < max;
}

export function isInside(v: vector, box: Box): boolean {
	return (
		isBetween(v.x, box[0].x, box[1].x) && isBetween(v.y, box[0].y, box[1].y)
		// not in all cases TODO FIXME
	);
}
