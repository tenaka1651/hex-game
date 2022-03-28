import {
  useType,
  useNewComponent,
  useChild,
  Canvas,
  Vector,
  Label,
  SystemFont,
  useDraw,
  useRootEntity,
  useNewRootComponent,
} from "@hex-engine/2d";
import HexGrid from "./HexGrid";
import ArmySprite from "./Sprites/ArmySprite";
import HexCell from "./HexCell";

export default function Root() {
  useType(Root);

  const canvas = useNewComponent(() => Canvas({ backgroundColor: "white" }));
  canvas.fullscreen();

  useChild(() => HexGrid(new Vector(100, 200)));

  useChild(() => {
    const font = useNewComponent(() =>
      SystemFont({ name: "sans-serif", size: 16, color: "black" })
    );
    const label = useNewComponent(() =>
      Label({
        text: "Click cell to set to blue, right-click to set to white",
        font,
      })
    );

    useDraw((context) => {
      label.draw(context, { x: 3, y: font.size });
    });
  });

  useNewComponent(() =>
    Canvas.DrawOrder(function sort(entities) {
      const sorted = Canvas.DrawOrder.defaultSort(entities);
      return sorted.sort((a, b) => {
        if (a.type === ArmySprite || b.type === HexCell) return 1;
        if (b.type === ArmySprite || a.type === HexCell) return -1;
        return 0;
      });
  }));
}
