import { Army } from './Domain/Army';
import {TileContents} from './Domain/TileContents';

import {
  useType,
  useNewComponent,
  useChild,
  Vector,
  Grid,
  Geometry,
  Polygon,
  useEntity
} from "@hex-engine/2d";
import HexCell, { CELL_WIDTH, CELL_HEIGHT, GridPosition } from "./HexCell";
import ArmySprite from './Sprites/ArmySprite';

export default function HexGrid(position: Vector) {
  useType(HexGrid);

  useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(100, 100),
      position,
    })
  );

  //Initialise grid or load from API
  const grid = new Grid(6, 6, new TileContents());
  for(var i: number = 0; i < 6; i++) {
    for(var j: number = 0; j< 6; j++) {
        grid.set(i,j,new TileContents());
    }
  }

  //Initialise armies
  var testArmy = new Army();
  testArmy.archers = 5;
  grid.get(3,3).armies.push(testArmy)

  var testArmy2 = new Army();
  testArmy2.archers = 2;
  grid.get(1,4).armies.push(testArmy2)


  for (const [x, y] of grid.contents()) {
    const isOffsetRow = y % 2 === 1;
    const xOffset = isOffsetRow ? CELL_WIDTH / 2 : 0;

    useChild(() =>
      HexCell({
        position: new Vector(x * CELL_WIDTH + xOffset, y * 0.75 * CELL_HEIGHT),
        gridCoordinates: new Vector(x,y),
        getColor: () => {
          if(grid.get(x, y).naturalResources.gold > 5) return "yellow"
          if(grid.get(x, y).naturalResources.silver > 5) return "silver"
          if(grid.get(x, y).naturalResources.iron > 5) return "brown"
          if(grid.get(x, y).naturalResources.agriculture > 5) return "green"
          return "grey"
        },
        getResources: () => {
          let nr = grid.get(x,y);
          return "G:"+ nr.naturalResources.gold.toString() + " S:"+ nr.naturalResources.silver.toString() + " I:"+ nr.naturalResources.iron.toString() + " A:"+ nr.naturalResources.agriculture.toString();
        },
        tileContents: grid.get(x,y),
        developResource: (resource: string) => {
          var nr = grid.get(x,y);
          switch(resource) {
            case "gold" : {
              nr.naturalResources.gold = nr.naturalResources.gold + 1;
              break;
            }
            case "silver" : {
              nr.naturalResources.silver = nr.naturalResources.silver + 1;
              break;
            }       
            default: { 
              //statements; 
              break; 
           }                  
          }
          grid.set(x,y,nr);
        }
      })
    );
  }

  //Now loop through HexCells and draw armies etc on them
  useEntity().children.forEach(hexCell => {
    //I added a GridPosition component to HexCell to store the x & y values of the grid, so I can relate the HexCell to the matching grid Object
    const pos = hexCell.getComponent(GridPosition);
    if (pos == null) {
      console.error("No grid position found for HexCell");
      return;
    }
    const xPos = pos.x
    const yPos = pos.y
    const tile = grid.get(xPos,yPos);
    //Process tile
    if (tile.armies.length > 0){
      console.error("Draw armies");
      //Loop through each army on the tile
      tile.armies.forEach(armyValue => {
        hexCell.createChild(() => ArmySprite({
          position: new Vector(0, 0),
          army: armyValue
        }));
      })
    }
  }); 
}