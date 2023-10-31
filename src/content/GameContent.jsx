import Clicker from "../components/Clicker";
import Shop from "../components/Shop";
import classes from "./_game-content.module.scss";
function GameContent() {
  return (
    <main class={classes.content}>
      <Clicker />
      <Shop />
    </main>
  );
}
export default GameContent;
