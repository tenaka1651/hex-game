import {TileMath} from "../Utilities/TileMath";

export class Army {
    friendly: boolean;
    spears: number;
    archers: number;
    swords: number;
    catapults: number;

    constructor() {
        this.friendly = false;
        this.spears = 0
        this.archers = 0;
        this.swords = 0;
        this.catapults = 0;
    }

}