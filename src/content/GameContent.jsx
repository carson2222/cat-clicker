import Clicker from "../components/Clicker/Clicker";
import Shop from "../components/Shop/Shop";
import classes from "./_game-content.module.scss";
import SkinSelector from "../components/SkinSelector/SkinSelector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragItem from "../components/Clicker/DragItem";
function GameContent() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={classes.content}>
        <SkinSelector />

        <Clicker />
        <Shop />
      </main>
    </DndProvider>
  );
}
export default GameContent;
