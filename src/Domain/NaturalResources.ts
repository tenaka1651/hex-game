import {TileMath} from "../Utilities/TileMath";

export class NaturalResources {
    gold: number;
    silver: number;
    iron: number;
    agriculture: number;

    constructor() {
        this.gold = TileMath.getRandomInt(9);
        this.silver = TileMath.getRandomInt(9);
        this.iron = TileMath.getRandomInt(9);
        this.agriculture = TileMath.getRandomInt(9);
    }

}