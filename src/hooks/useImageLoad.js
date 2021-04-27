import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadImages } from "../actions/actionCreators";

const useImageLoad = (imageName, imageSrc) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImages(imageName, imageSrc));
  }, [dispatch, imageName, imageSrc]);
};

export default useImageLoad;
