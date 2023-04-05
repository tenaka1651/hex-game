import { NaturalResources } from './NaturalResources';
import { Army } from './Army';

export class TileContents {
    armies: Army[];
    naturalResources: NaturalResources;
    explored: boolean;

    constructor(armies: Army[], naturalResources: NaturalResources, explored: boolean) {
        this.armies = armies;
        this.naturalResources = naturalResources;
        this.explored = explored;
    }

}