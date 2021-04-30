import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadImages } from "../actions/gameActionCreators";

import energyBattleImages from "../games/images/energyBattle/energyBattleImages";
import monsterEscapeImages from "../games/images/monsterEscape/monsterEscapeImages";
import littleForestImages from "../games/images/littleForest/littleForestImages";

/**
 *
 * @param {string} gameName current game name
 */
const useImageLoad = (gameName) => {
  let imageSrc;

  const dispatch = useDispatch();

  useEffect(() => {
    if (gameName === "energyBattle") {
      imageSrc = energyBattleImages;
    } else if (gameName === "monsterEscape") {
      imageSrc = monsterEscapeImages;
    } else if (gameName === "littleForest") {
      imageSrc = littleForestImages;
    } else {
      return;
    }

    dispatch(loadImages(gameName, imageSrc));
  }, [dispatch, gameName, imageSrc]);
};

export default useImageLoad;
