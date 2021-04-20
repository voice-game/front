import { useEffect } from "react";

const loadImages = async (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });
};

const useImage = (urls, setImages) => {
  useEffect(() => {
    (async () => {
      const images = [];

      for (let i = 0; i < urls.length; i++) {
        const image = await loadImages(urls[i]);
        images.push(image);
      }

      setImages(images);
    })();
  }, [urls, setImages]);
};

export default useImage;
