import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
  Label,
  SystemFont,
  useDraw,
  useRootEntity,
  useNewRootComponent,
} from "@hex-engine/2d";
import HexGrid from "./HexGrid";
import { Tile } from "./Domain/Tile";

  //Storage for game state
  function TileState() {
    useType(TileState);
    const tiles: Tile[][] = [];

    for(var i: number = 0; i < 10; i++) {
      for(var j: number = 0; j< 10; j++) {
          tiles[i][j] = new Tile(i,j);
      }
    }   
    return { tiles };
  }  

  function useTileState() {
    const currentTileState =
      useRootEntity().getComponent(TileState) ||
      useNewRootComponent(TileState);
    const tiles = currentTileState.tiles;
    return tiles;
  }  
  //end storage

export default function Root() {
  useType(Root);

  useNewComponent(TileState);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen();

  useChild(() => HexGrid(new Vector(100, 200), useTileState()));

  useChild(() => {
    const font = useNewComponent(() =>
      SystemFont({ name: "sans-serif", size: 16, color: "black" })
    );
    const label = useNewComponent(() =>
      Label({
        text: "Click cell to set to blue, right-click to set to white",
        font,
      })
    );

    useDraw((context) => {
      label.draw(context, { x: 3, y: font.size });
    });
  });
}
