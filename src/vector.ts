export class vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(v: vector) {
		return new vector(this.x + v.x, this.y + v.y);
	}

	div(num: number) {
		return new vector(this.x / num, this.y / num);
	}
}
