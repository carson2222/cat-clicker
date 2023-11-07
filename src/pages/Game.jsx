import GameContent from "../content/GameContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
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
