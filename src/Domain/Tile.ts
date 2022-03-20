export class Tile {
    color: string;
    terrain: string;

    constructor(color: string, terrain: string) {
            this.color = color
            this.terrain = terrain
    }

    conquer():void {
        this.color = "red"
    }

}