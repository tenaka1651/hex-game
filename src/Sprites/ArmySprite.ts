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

export default function ArmySprite({
  position,
  army
}: {
  position: Vector;
  army: Army;
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
  
  const draggable = useNewComponent(() => Draggable(geometry));
  if (draggable.isDragging) {
    console.log(position.x.toString()+"-"+position.y.toString());
  }

  useChild(() => {
    useNewComponent(() => ArmySheet(army));
  });


  useDraw((context) => {
    context.fillStyle = "red";
    geometry.shape.draw(context, "fill");
  });

}
