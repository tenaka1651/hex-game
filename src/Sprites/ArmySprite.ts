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

export default function ArmySprite({
  position,
  displayArmySheet
}: {
  position: Vector;
  displayArmySheet: () => any;
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
  useNewComponent(() => Draggable(geometry));

  useDraw((context) => {
    context.fillStyle = "red";
    geometry.shape.draw(context, "fill");
  });

  const mouse = useNewComponent(Mouse);
  mouse.onClick(() => {
    displayArmySheet();
  });  
}
