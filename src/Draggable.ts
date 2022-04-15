import {
  useType,
  useNewComponent,
  useEntity,
  Geometry,
  Physics,
  Mouse,
  Vector,
  LowLevelMouse,
  useEntitiesAtPoint,
} from "@hex-engine/2d";
import HexCell, { GridPosition } from "./HexCell";

export default function Draggable(geometry: ReturnType<typeof Geometry>) {
  useType(Draggable);

  const physics = useEntity().getComponent(Physics.Body);

  const mouse = useNewComponent(Mouse);
  const { onCanvasLeave } = useNewComponent(LowLevelMouse);

  let originalStatic = true;
  let isDragging = false;
  const startedDraggingAt = new Vector(0, 0);

  mouse.onDown((event) => {
    if (physics) {
      originalStatic = physics.body.isStatic;
      physics.setStatic(true);
    }
    isDragging = true;
    startedDraggingAt.mutateInto(event.pos);
  });

  mouse.onMove((event) => {
    if (isDragging) {
      geometry.position.addMutate(event.pos.subtract(startedDraggingAt));
    }
  });

  const onUpHandler = () => {
    if (physics) {
      physics.setStatic(originalStatic);
    }
    if (isDragging) {
      const startingCell = useEntity().parent;
      if (startingCell != null) {
        const gridPos = startingCell.getComponent(GridPosition);
        console.log(gridPos?.x.toString() + ","+ gridPos?.y.toString())
        //get target HexCell
        const entitiesAtDrop = useEntitiesAtPoint(geometry.worldPosition());
        const cellsAtDrop = entitiesAtDrop.filter(e => e.getComponent(HexCell))
        for (const ent of cellsAtDrop) {
          const cell = ent.getComponent(GridPosition)
          console.log("dropped on - "+cell?.x.toString()+","+cell?.y.toString())
        }
      }
    }
    isDragging = false;
  };
  mouse.onUp(onUpHandler);
  //onCanvasLeave(onUpHandler);

  return {
    get isDragging() {
      return isDragging;
    },
  };  
}
