import { vector } from "./vector";

export type box = [vector, vector];

export function isBetween(num: number, min: number, max: number): boolean {
	return num > min && num < max;
}

export function isInside(v: vector, box: box): boolean {
	return (
		isBetween(v.x, box[0].x, box[1].x) && isBetween(v.y, box[0].y, box[1].y) // not in all cases TODO FIXME
	);
}
