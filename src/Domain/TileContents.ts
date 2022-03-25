import { NaturalResources } from './NaturalResources';
import { Army } from './Army';

export class TileContents {
    armies: Army[];
    naturalResources: NaturalResources;

    constructor() {
        this.armies = new Array<Army>();
        this.naturalResources = new NaturalResources();
    }

}