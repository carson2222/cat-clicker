import { useDispatch, useSelector } from "react-redux";
import skinsData from "../skinsData";
import { activateSkin, setActiveSkin } from "../features/gameSlice";

function useSkinSelector() {
  const dispatch = useDispatch();
  const skins = useSelector((state) => state.game.skins);
  const activeSkin = useSelector((state) => state.game.activeSkin);
  const items = useSelector((state) => state.game.items);

  function changeSkin(type) {
    const newActiveSkin = skinsData.find((el) => el.name === type);
    if (skins[newActiveSkin.id] && newActiveSkin.path !== activeSkin)
      dispatch(setActiveSkin(newActiveSkin.path));
  }
  function newSkin() {
    const newSkinId = +items.mainCat.level + 1;
    dispatch(activateSkin(newSkinId));
  }

  return { changeSkin, newSkin };
}

export default useSkinSelector;
