import { useChild } from '@hex-engine/core';
import {
  useType,
  useNewComponent,
  Geometry,
  Polygon,
  Vector,
  Physics,
  useDraw,
  Mouse,
} from "@hex-engine/2d";
import Draggable from "../Draggable";
import ArmySheet from "./ArmySheet";
import { Army } from '../Domain/Army';
import { Emitter, EventType } from "mitt";

export default function ArmySprite({
  position,
  army,
  emitter
}: {
  position: Vector;
  army: Army;
  emitter: Emitter<Record<EventType, unknown>>;
}) 
  {
  useType(ArmySprite);

  const geometry = useNewComponent(() =>
    Geometry({
      shape: Polygon.rectangle(new Vector(25, 25)),
      position: position.clone(),
    })
  );

  useNewComponent(() => Physics.Body(geometry, {isStatic : true}));
  
  const draggable = useNewComponent(() => Draggable(geometry, emitter));
  if (draggable.isDragging) {
    console.log(position.x.toString()+"-"+position.y.toString());
  }

  // useChild(() => {
  //   useNewComponent(() => ArmySheet(army));
  // });


  useDraw((context) => {
    context.fillStyle = "red";
    geometry.shape.draw(context, "fill");
  });

}
