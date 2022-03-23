import { NaturalResources } from './NaturalResources';

export class Tile {

    x: number;
    y: number;
    color: string;
    terrain: string;
    //resources: NaturalResources;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.color = "green";
        this.terrain = "grass"
        //this.resources = new NaturalResources();
    }

    conquer() {
        this.color = "red"
    }

    getTerrain() {
        return this.terrain;
    }

}