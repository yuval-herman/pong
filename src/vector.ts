export class vector {
	x: number;
	y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(v: vector | number) {
		if (typeof v === "number") return new vector(this.x + v, this.y + v);
		else return new vector(this.x + v.x, this.y + v.y);
	}

	sub(v: vector | number) {
		if (typeof v === "number") return new vector(this.x - v, this.y - v);
		else return new vector(this.x - v.x, this.y - v.y);
	}

	div(num: number) {
		return new vector(this.x / num, this.y / num);
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}
}
