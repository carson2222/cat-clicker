import Clicker from "../components/Clicker/Clicker";
import Shop from "../components/Shop/Shop";
import classes from "./_game-content.module.scss";
import SkinSelector from "../components/SkinSelector/SkinSelector";
function GameContent() {
  return (
    <main className={classes.content}>
      <SkinSelector />
      <Clicker />
      <Shop />
    </main>
  );
}
export default GameContent;
