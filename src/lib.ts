import { createRoot } from "@hex-engine/2d";
import { Emitter, EventType } from "mitt";
import Root from "./Root";
import { TileContents } from "./Domain/TileContents";

export function drawGrid(canvas: HTMLCanvasElement, gridSize : number, emitter : Emitter<Record<EventType, unknown>>, tiles : TileContents[][]) {
    createRoot(() => Root(canvas, emitter, gridSize, tiles));
}
