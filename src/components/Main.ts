
import { Vue } from "vue-class-component";

import axios from "axios";

import { boardMapping } from "./model/board";
import { pieceMapping } from "./model/piece";
import { actionMapping } from "./model/action";

export default class Main extends Vue {
	originalText: string = '';
	finalText: string = '';
	urlString: string = '';

	requestPlayOK(event: Event) {
		this.reset();

		if (!this.urlString || !this.isValidLink(this.urlString)) {
			(<HTMLElement>this.$refs['alert-message']).innerHTML = 'url ไม่ถูกต้อง';
			return;
		}

		(<HTMLElement>this.$refs['alert-message']).innerHTML = 'กำลังประมวลผล...';

		const id = this.urlString.split('https://www.playok.com/p/?g=')[1];
		axios
			.get(`https://aqi-reo13.herokuapp.com/api/chess/${id}`, { timeout: 2000 })
			.then((response) => {
				const arr = response.data.split("]");
				this.handle(arr[arr.length - 1].trim());
				(<HTMLElement>this.$refs['alert-message']).classList.add('hidden');
			})
			.catch((error) => {
				// handle error
				(<HTMLElement>this.$refs['alert-message']).innerHTML = 'ไม่สามารถเชื่อมต่อ server ได้';
				console.log(error);
			})
	}

	autofill(event: Event) {
		const inputElement = <HTMLInputElement>this.$refs.input;
		this.urlString = 'https://www.playok.com/p/?g=mk63281508';
		inputElement.value = this.urlString;
		inputElement.dispatchEvent(new Event("change"));
	}

	private reset() {
		this.originalText = '';
		this.finalText = '';

		(<HTMLInputElement>this.$refs.input).value = '';
		(<HTMLElement>this.$refs['alert-message']).innerHTML = '';
		(<HTMLElement>this.$refs['alert-message']).classList.remove('hidden');
	}

	private isValidLink(link: string): boolean {
		return !!link.match(/https:\/\/www.playok.com\/p\/\?g=/);
	}

	private handle(text: string): void {
		const turns = text.split(/\d+\./g);
		let index = 0;
		const input = [];
		const output = [];
		for (const turn of turns) {
			const trimTurn = turn.trim().replace(/\r\n/g, "");
			const exec = /(\w+)(\+|=P?)?\s+(\w+)(\+|=P?)?/.exec(trimTurn);
			if (exec) {
				index++;
				const [white, black] = trimTurn.split(' ');
				input.push(`
					<div class="item-container original-group">
						<div class="item-index"> ${index} </div>
						<div class="item-turn">
							<div class="item-turn__white">${white}</div>
							<div class="item-turn__black">${black}</div>
						</div>
					</div>
			`);
				const extractWhite = this.extract(exec[1], exec[2]);
				const extractBlack = this.extract(exec[3], exec[4]);
				output.push(`
					<div class="item-container final-group">
						<div class="item-index"> ${index} </div>
						<div class="item-turn">
							<div class="item-turn__white">${extractWhite}</div>
							<div class="item-turn__black">${extractBlack}</div>
						</div>
					</div>
			`);
			}
		}
		this.originalText = input.join('<br/>');
		this.finalText = output.join('<br/>');
	}

	private extract(str: string, check: string): string {
		const exec = /(K|Q|N|R|B|P)?([a-h])?(x)?([a-h])(\d)/.exec(str);
		let mark;
		let posFrom;
		let posTo;
		if (exec) {
			mark = exec[1] ? pieceMapping[exec[1]] : pieceMapping[""];
			posFrom = exec[2] ? boardMapping[exec[2]] : "";
			posTo = exec[4] ? boardMapping[exec[4]] : "";
			const output =
				mark +
				" " +
				posFrom +
				" " +
				(posFrom ? "ไป" : "") +
				(exec[3] ? actionMapping[exec[3]] : "") +
				(check === "+" ? actionMapping["+"] : "") +
				" " +
				posTo +
				exec[5] +
				" " +
				(check && check === "=P" ? actionMapping[check] : "");
			return output;
		}
		return "";
	}
}
