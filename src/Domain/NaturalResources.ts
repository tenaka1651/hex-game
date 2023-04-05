import {TileMath} from "../Utilities/TileMath";

export class NaturalResources {
    gold: number;
    silver: number;
    iron: number;
    agriculture: number;

    constructor(gold: number, silver: number, iron: number, agriculture: number) {
        this.gold = gold;
        this.silver = silver;
        this.iron = iron;
        this.agriculture = agriculture;
    }

}