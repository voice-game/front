import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadImages } from "../actions/actionCreators";

const useImage = (imageName, imageSrc) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadImages(imageName, imageSrc));
  }, [dispatch, imageName, imageSrc]);
};

export default useImage;
// 오타아님... 기존 useImage 제거하면 useImages.js -> useImage로 바꿀 예정
