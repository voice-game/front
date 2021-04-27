import { useEffect, useState } from "react";

const loadImages = async (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });
};

const useImage = (urls, initialState) => {
  const [images, setImages] = useState(initialState);

  useEffect(() => {
    if (Array.isArray(urls)) {
      (async () => {
        const images = [];

        for (let i = 0; i < urls.length; i++) {
          const image = await loadImages(urls[i]);
          images.push(image);
        }

        setImages(images);
      })();
    } else if (typeof urls === "object") {
      (async () => {
        const images = {};
        const urlEntries = Object.entries(urls);

        for (let i = 0; i < urlEntries.length; i++) {
          images[urlEntries[i][0]] = await loadImages(urlEntries[i][1]);
        }

        setImages(images);
      })();
    }
  }, [urls, setImages]);

  return images;
};

export default useImage;
