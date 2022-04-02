import { Army } from './Domain/Army';
import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
  useRootEntity,
  useUpdate,
} from "@hex-engine/2d";
import HexGrid from "./HexGrid";
import HexCell from "./HexCell";
import ArmySprite from './Sprites/ArmySprite';

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen();

  useChild(() => HexGrid(new Vector(100, 200)));

  // useNewComponent(() =>
  //   Canvas.DrawOrder(function sort(entities) {
  //     const sorted = Canvas.DrawOrder.defaultSort(entities);
  //     return sorted.sort((a, b) => {
  //       if (a.type === ArmySprite || b.type === HexCell) return 1;
  //       if (b.type === ArmySprite || a.type === HexCell) return -1;
  //       return 0;
  //     });
  // }));
// The System Component
function ProcessFuelRefills() {
  useType(ProcessFuelRefills);
  const root = useRootEntity();
  useUpdate(() => {
    const allEntities = root.descendants();
    const cells = allEntities.filter(ent => ent.getComponent(HexCell));
    for (const ent of allEntities) {
      const fuelTank = ent.getComponent(ArmySprite);
      // fuelTank will be null if the entity doesn't have a fuel tank
      //if (!fuelTank) continue;
      //if (cells.some(refiller => /* return whether ent is colliding with refiller */)) {
        //fuelTank.value = fuelTank.capacity;
      //}
    }
  });
}  
}
