import { Box, isInside } from "../src/helpers";
import { vector } from "../src/vector";

const box1: Box = [new vector(5, 5), new vector(15, 15)];
const box2: Box = [new vector(15, 15), new vector(5, 5)];
const vec = new vector(4, 5);

describe.only("Test helpers", () => {
	it("Test isInside method", () => {
		expect(isInside(vec, box1)).toBe(false);
	});
});
