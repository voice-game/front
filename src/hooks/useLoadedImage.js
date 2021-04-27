import { useSelector } from "react-redux";
import _ from "lodash";

const useLoadedImage = (name) => {
  const myImage = { image: null, isLoaded: false };

  const isLoaded = useSelector((state) => state.imageReducer.isLoaded[name]);

  const image = useSelector(
    (state) => {
      if (state.imageReducer.isLoaded[name]) {
        return state.imageReducer[name];
      }
    },
    (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next)
  );

  if (isLoaded) {
    myImage.image = image;
    myImage.isLoaded = isLoaded;
  }

  return myImage;
};

export default useLoadedImage;
