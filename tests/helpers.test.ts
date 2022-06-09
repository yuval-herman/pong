import { Box, isInside, shrinkBox } from "../src/helpers";
import { vector } from "../src/vector";

const box1: Box = [new vector(5, 5), new vector(15, 15)];
const vec = new vector(4, 5);

describe("Test helpers", () => {
	it("Test isInside", () => {
		expect(isInside(vec, box1)).toBe(false);
		vec.x = 5;
		expect(isInside(vec, box1)).toBe(false);
		vec.x = 6;
		vec.y = 6;
		expect(isInside(vec, box1)).toBe(true);
	});
	it("test shrinkBox", () => {
		const box: Box = [new vector(0, 0), new vector(4, 4)];
		expect(shrinkBox(box, 2)).toStrictEqual([
			new vector(2, 2),
			new vector(2, 2),
		]);
	});
});
