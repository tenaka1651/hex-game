import {
  useType,
  useNewComponent,
  useChild,
  useRootEntity,
  Vector,
  Grid,
  Geometry,
  Polygon,
} from "@hex-engine/2d";
import HexCell, { CELL_WIDTH, CELL_HEIGHT } from "./HexCell";
import { Tile } from "./Domain/Tile";

export default function HexGrid(position: Vector, tiles: Tile[][]) {
  useType(HexGrid);

  useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(100, 100),
      position,
    })
  );

  const grid = new Grid(6, 6, Tile[1][1]);
  grid.set(2, 3, Tile[2][2]);
  grid.set(5, 5, Tile[3][3]);

  for (const [x, y] of grid.contents()) {
    const isOffsetRow = y % 2 === 1;
    const xOffset = isOffsetRow ? CELL_WIDTH / 2 : 0;

    useChild(() =>
      HexCell({
        position: new Vector(x * CELL_WIDTH + xOffset, y * 0.75 * CELL_HEIGHT),
        getColor: () => grid.get(x, y).color,
        setColor: (newColor: string) => grid.set(x, y, new Tile(x,y)),
      })
    );
  }
}