//import { createRoot } from "@hex-engine/2d";
import { drawGrid } from "./lib";
import { TileContents } from "./Domain/TileContents";
import { NaturalResources } from "./Domain/NaturalResources";
import mitt from 'mitt'


//event emitter
const emitter = mitt();
// listen to an event
//emitter.on('hexmove', e => console.log('hexmove', e));

//Initialise an array of arrays of TileContents of size gridSize
var gridSize = 3;
var tiles = new Array(gridSize);
for(var i = 0; i < gridSize; i++) {
    tiles[i] = new Array(gridSize);
    for(var j = 0; j < gridSize; j++) {
        tiles[i][j] = new TileContents([], new NaturalResources(0,0,0,0), false);
    }
}

drawGrid(document.getElementById("game") as HTMLCanvasElement, 3, emitter, tiles);



