import {
  useType,
  useNewComponent,
  useEntity,
  Vector,
  Geometry,
  Polygon,
  Mouse,
  useDraw,
  TextBox,
  SystemFont,
  Label,
} from "@hex-engine/2d";
import { useChild } from "@hex-engine/core";
import Box from "./Box";

export const CELL_RADIUS = 46;
export const CELL_WIDTH = Math.sqrt(3) * CELL_RADIUS;
export const CELL_HEIGHT = 2 * CELL_RADIUS;

export default function HexCell({
  position,
  getColor,
  getResources,
  developResource,
}: {
  position: Vector;
  getColor: () => string;
  getResources : () => string;
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

  useNewComponent(() => Geometry({ shape, position }));
 
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
    developResource("gold");
  });

  mouse.onRightClick(() => {
    useChild(() => Box(new Vector(0, 0)));
  });
}