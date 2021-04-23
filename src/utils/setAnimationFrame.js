const setAnimationFrame = () => {
  let then;

  return (step, time, recursiveFunc, draw, ref) => {
    if (!then) {
      then = time;
    }

    if (time - then <= step) {
      ref.current = recursiveFunc(draw);

      return false;
    }

    then = time;

    return true;
  };
};

export default setAnimationFrame;
