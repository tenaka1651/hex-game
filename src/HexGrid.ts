import { NaturalResources } from './Domain/NaturalResources';
import {
  useType,
  useNewComponent,
  useChild,
  Vector,
  Grid,
  Geometry,
  Polygon,
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
  const grid = new Grid(6, 6, new NaturalResources());
  for(var i: number = 0; i < 6; i++) {
    for(var j: number = 0; j< 6; j++) {
        grid.set(i,j,new NaturalResources());
    }
  }

  //Initialise armies
  

  for (const [x, y] of grid.contents()) {
    const isOffsetRow = y % 2 === 1;
    const xOffset = isOffsetRow ? CELL_WIDTH / 2 : 0;

    useChild(() =>
      HexCell({
        position: new Vector(x * CELL_WIDTH + xOffset, y * 0.75 * CELL_HEIGHT),
        getColor: () => {
          if(grid.get(x, y).gold > 5) return "yellow"
          if(grid.get(x, y).silver > 5) return "silver"
          if(grid.get(x, y).iron > 5) return "brown"
          if(grid.get(x, y).agriculture > 5) return "green"
          return "grey"
        },
        getResources: () => {
          let nr = grid.get(x,y);
          return "G:"+ nr.gold.toString() + " S:"+ nr.silver.toString() + " I:"+ nr.iron.toString() + " A:"+ nr.agriculture.toString();
        },
        developResource: (resource: string) => {
          var nr = grid.get(x,y);
          switch(resource) {
            case "gold" : {
              nr.gold = nr.gold + 1;
              break;
            }
            case "silver" : {
              nr.silver = nr.silver + 1;
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
}