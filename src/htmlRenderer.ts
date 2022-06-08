import { Box } from "./helpers";
import { objTypes, Renderer } from "./renderer";
import { vector } from "./vector";

type element = {
	name: string;
	type: objTypes;
	html: HTMLElement;
};

export class HTMLRenderer implements Renderer {
	map = new Map<string, element>();
	intervalId = 0;
	htmlSpace = document.body;
	units = "vh";

	constructor() {
		this.htmlSpace.style.height = "100vh";
	}

	make(name: string, type: objTypes, height: number, width: number): void {
		let htmlElement: HTMLElement;

		if (type === objTypes.ball) htmlElement = this.makeBall(height, width);
		else htmlElement = this.makePaddle(height, width);

		this.map.set(name, {
			name: name,
			type: type,
			html: htmlElement,
		}); // no check for same name elements TODO FIXME

		this.htmlSpace.appendChild(htmlElement);
	}
	move(name: string, position: vector): void {
		const obj = this.map.get(name);
		const elem = obj?.html;

		elem!.style.top = position.y + this.units;
		elem!.style.left = position.x + this.units;
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

	makeBall(height: number, width: number): HTMLElement {
		const elem = document.createElement("div");
		elem.style.backgroundColor = "white";
		elem.style.position = "absolute";
		elem.style.borderRadius = "50%";
		elem.style.height = height + this.units;
		elem.style.width = width + this.units;
		return elem;
	}

	makePaddle(height: number, width: number): HTMLElement {
		const elem = document.createElement("div");
		elem.style.backgroundColor = "white";
		elem.style.position = "absolute";
		elem.style.borderRadius = "2%";
		elem.style.height = height + this.units;
		elem.style.width = width + this.units;
		return elem;
	}
}
