import { Army } from './../Domain/Army';
import {
  useType,
  useNewComponent,
  SystemFont,
  Label,
  useDraw
} from "@hex-engine/2d";

export default function ArmySheet(army: Army)
  {
  useType(ArmySheet);

  const font = useNewComponent(() =>
    SystemFont({ name: "sans-serif", size: 10, color: "black" })
  );
  const label = useNewComponent(() =>
    Label({
      font
    })
  );
  useDraw((context) => {
    label.text = "Archers = "+army.archers.toString();
    label.draw(context, { x: 200, y: 0 });
    //TODO try instead passing the Army details or TileDetails down to child functions as a generic Type, then the child type can deal with implementation
  });     

}
