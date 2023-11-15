import Clicker from "../components/Clicker";
import Shop from "../components/Shop";
import classes from "./_game-content.module.scss";
import AuthForm from "./AuthContent";
function GameContent() {
  return (
    <main className={classes.content}>
      <Clicker />
      <Shop />
    </main>
  );
}
export default GameContent;
