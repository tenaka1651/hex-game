import { Army } from './Domain/Army';
import { TileContents } from './Domain/TileContents';

import {
  useType,
  useNewComponent,
  useChild,
  Vector,
  Grid,
  Geometry,
  Polygon,
  SystemFont,
  Label,
  useDraw,
} from "@hex-engine/2d";
import HexCell, { CELL_WIDTH, CELL_HEIGHT } from "./HexCell";

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


  for (const [x, y] of grid.contents()) {
    const isOffsetRow = y % 2 === 1;
    const xOffset = isOffsetRow ? CELL_WIDTH / 2 : 0;

    useChild(() =>
      HexCell({
        position: new Vector(x * CELL_WIDTH + xOffset, y * 0.75 * CELL_HEIGHT),
        getColor: () => {
          if(grid.get(x, y).naturalResources.gold > 5) return "yellow"
          if(grid.get(x, y).naturalResources.silver > 5) return "silver"
          if(grid.get(x, y).naturalResources.iron > 5) return "brown"
          if(grid.get(x, y).naturalResources.agriculture > 5) return "green"
          return "grey"
        },
        getArmies: () => {
          return grid.get(x,y).armies;
        },
        getResources: () => {
          let nr = grid.get(x,y);
          return "G:"+ nr.naturalResources.gold.toString() + " S:"+ nr.naturalResources.silver.toString() + " I:"+ nr.naturalResources.iron.toString() + " A:"+ nr.naturalResources.agriculture.toString();
        },
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
        },
        displayArmySheet: () => {
          const font = useNewComponent(() =>
            SystemFont({ name: "sans-serif", size: 12, color: "black" })
          );
          const label = useNewComponent(() =>
            Label({
              font
            })
          );
          useDraw((context) => {
            label.text = "Archers = "+grid.get(x,y).armies[0].archers.toString();
            label.draw(context, { x: 230, y: 0 });
            //TODO try instead passing the Army details or TileDetails down to child functions as a generic Type, then the child type can deal with implementation
          });          
        }
      })
    );
  }
}