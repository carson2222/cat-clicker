import { useDispatch, useSelector } from "react-redux";
import { addLevel, resetXp, setToNextLevel } from "../features/gameSlice";
import notify from "../toastify";
function useXpBar() {
  const dispatch = useDispatch();
  const level = useSelector((state) => state.game.level);
  const toNextLevel = useSelector((state) => state.game.toNextLevel);
  const xp = useSelector((state) => state.game.xp);

  function levelUp() {
    if (+xp >= +toNextLevel) {
      dispatch(addLevel());
      dispatch(resetXp());
      notify("default", "Level UP! 😺");
    }
  }
  function calcToNextLevel() {
    const newToNextLevel = level * (level * 0.4) * 20;
    dispatch(setToNextLevel(newToNextLevel));
  }
  return { levelUp, calcToNextLevel };
}
export default useXpBar;
