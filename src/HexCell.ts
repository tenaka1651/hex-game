import {
  useType,
  useNewComponent,
  Vector,
  Geometry,
  Polygon,
  Mouse,
  useDraw,
  SystemFont,
  Label,
} from "@hex-engine/2d";
import { useChild } from "@hex-engine/core";
import {TileContents} from './Domain/TileContents'
import { Emitter, EventType } from "mitt";

export const CELL_RADIUS = 46;
export const CELL_WIDTH = Math.sqrt(3) * CELL_RADIUS;
export const CELL_HEIGHT = 2 * CELL_RADIUS;

export function GridPosition(x: number, y: number) {
  useType(GridPosition);
  return { x, y };
}

export default function HexCell({
  position,
  gridCoordinates,
  emitter,
  getColor,
  getResources,
  tileContents,
  developResource
}: {
  position: Vector;
  gridCoordinates: Vector;
  emitter: Emitter<Record<EventType, unknown>>;
  getColor: () => string;
  getResources : () => string;
  tileContents : TileContents;
  developResource: (resource: string) => any;
}) {
  useType(HexCell);

  const shape = new Polygon([
    new Vector(0.5 * CELL_WIDTH, 0),
    new Vector(CELL_WIDTH, 0.25 * CELL_HEIGHT),
    new Vector(CELL_WIDTH, 0.75 * CELL_HEIGHT),
    new Vector(0.5 * CELL_WIDTH, CELL_HEIGHT),
    new Vector(0, 0.75 * CELL_HEIGHT),
    new Vector(0, 0.25 * CELL_HEIGHT),
  ]);

  const xPos = gridCoordinates.x;
  const yPos = gridCoordinates.y;

  useNewComponent(() => Geometry({ shape, position }));
  useNewComponent(() => GridPosition(xPos,yPos));

  useChild(() => {
    const font = useNewComponent(() =>
      SystemFont({ name: "sans-serif", size: 12, color: "black" })
    );
    const label = useNewComponent(() =>
      Label({
        font
      })
    );
    useDraw((context) => {
      label.text = getResources();
      label.draw(context, { x: -40, y: font.size });
    });
  });

  const mouse = useNewComponent(Mouse);

  useDraw((context) => {
    context.fillStyle = getColor();
    shape.draw(context, "fill");

    if (mouse.isInsideBounds) {
      context.lineWidth = 3;
      context.strokeStyle = "cyan";
      shape.draw(context, "stroke");
    } else {
      context.lineWidth = 1;
      context.strokeStyle = "black";
      shape.draw(context, "stroke");
    }
  });

  mouse.onClick(() => {
    emitter.emit('hexclick', {x: xPos, y: yPos});
  });

  // mouse.onRightClick(() => {
  //   //draw armies
  //   if(tileContents.armies.length > 0) {
  //     useChild(() => ArmySprite({
  //       position: new Vector(0, 0),
  //       army: tileContents.armies[0],
  //       emitter: emitter
  //     }));
  //   }
  // });
}