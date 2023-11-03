import GameContent from "../content/GameContent";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { upgradesCalc } from "../features/shopSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
function Game() {
  const shop = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  // init
  useEffect(() => {
    dispatch(upgradesCalc());
  }, []);
  return (
    <div className="container">
      <Header />
      <GameContent />
      <Footer />
    </div>
  );
}
export default Game;
