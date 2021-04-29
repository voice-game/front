import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadImages } from "../actions/gameActionCreators";

import energyBattleImages from "../games/images/energyBattle/energyBattleImages";
import monsterEscapeImages from "../games/images/monsterEscape/monsterEscapeImages";
import littleForestImages from "../games/images/littleForest/littleForestImages";

const useImageLoad = (imageName) => {
  let imageSrc;

  const dispatch = useDispatch();

  useEffect(() => {
    if (imageName === "energyBattle") {
      imageSrc = energyBattleImages;
    } else if (imageName === "monsterEscape") {
      imageSrc = monsterEscapeImages;
    } else if (imageName === "littleForest") {
      imageSrc = littleForestImages;
    } else {
      return;
    }

    dispatch(loadImages(imageName, imageSrc));
  }, [dispatch, imageName, imageSrc]);
};

export default useImageLoad;
