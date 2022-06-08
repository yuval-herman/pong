import { Box } from "./helpers";
import { objTypes, Renderer } from "./renderer";
import { vector } from "./vector";

type element = {
	name: string;
	type: objTypes;
	html: HTMLElement;
	height: number;
	width: number;
};

export class HTMLRenderer implements Renderer {
	map = new Map<string, element>();
	intervalId = 0;
	htmlSpace = document.body;
	units = "px";
	debug: boolean;

	constructor(debug = false) {
		this.debug = debug;
		this.htmlSpace.style.height = "100vh";
		this.htmlSpace.style.margin = "0";
	}

	make(name: string, type: objTypes, height: number, width: number): void {
		let htmlElement: HTMLElement;

		if (type === objTypes.ball) htmlElement = this.makeBall(height, width);
		else htmlElement = this.makePaddle(height, width);

		this.map.set(name, {
			name: name,
			type: type,
			html: htmlElement,
			height: height,
			width: width,
		}); // no check for same name elements TODO FIXME

		this.htmlSpace.appendChild(htmlElement);
	}
	move(name: string, position: vector): void {
		const obj = this.map.get(name);
		const elem = obj?.html;
		if (!elem) return;
		elem.style.top = this.convertToPx(position.y - obj.height / 2);
		elem.style.left = this.convertToPx(position.x - obj.width / 2);
		if (this.debug) elem.innerText = String(position.y);
	}

	setInterval(fn: Function, ms: number) {
		this.intervalId = setInterval(fn, ms);
	}
	stopInterval() {
		clearInterval(this.intervalId);
	}

	getField(): Box {
		return [
			new vector(0, 0),
			new vector(
				this.htmlSpace.offsetWidth,
				this.htmlSpace.offsetHeight
			).div(10),
		];
	}

	convertToPx(n: number): string {
		return n * 10 + "px";
	}

	makeAbsDiv() {
		const elem = document.createElement("div");
		elem.style.backgroundColor = "white";
		elem.style.position = "absolute";
		return elem;
	}

	makeBall(height: number, width: number): HTMLElement {
		const elem = this.makeAbsDiv();
		elem.style.borderRadius = "50%";
		elem.style.height = this.convertToPx(height);
		elem.style.width = this.convertToPx(width);
		return elem;
	}

	makePaddle(height: number, width: number): HTMLElement {
		const elem = this.makeAbsDiv();
		elem.style.borderRadius = "5%";
		elem.style.height = this.convertToPx(height);
		elem.style.width = this.convertToPx(width);
		return elem;
	}
}
