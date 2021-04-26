const loadImage = async (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });
};

export default loadImage;
