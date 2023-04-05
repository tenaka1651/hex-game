import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
} from "@hex-engine/2d";
import HexGrid from "./HexGrid";
import { TileContents } from "./Domain/TileContents";
import { Emitter, EventType } from "mitt";

export default function Root(targetCanvas: HTMLCanvasElement, emitter : Emitter<Record<EventType, unknown>>, gridSize : number, tiles : TileContents[][]) {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.element = targetCanvas;
  canvas.fullscreen();

  useChild(() => HexGrid(new Vector(100, 200),emitter, gridSize, tiles));

}
