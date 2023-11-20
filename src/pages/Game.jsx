import GameContent from "../content/GameContent";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";

function Game() {
  return (
    <div className="container">
      <Header />
      <GameContent />
      <Footer />
    </div>
  );
}
export default Game;
