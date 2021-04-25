/**
 *
<<<<<<< HEAD
 * @param {array} roomList All room list of target game
 * @returns picked room (only enterable state)
=======
 * @param {*} roomList
 * @returns
>>>>>>> 628f1d3488aeeb1cd581a1a536cb57573c77fbcc
 */
const pickRandomRoom = (roomList) => {
  const enterable = roomList.filter((room) => room.status === "Enter");
  const randomIndex = Math.floor(
    (Math.random() + 1) * enterable.length
  );
  const picked = enterable[randomIndex];

  return picked ? picked : enterable[0];
};

export default pickRandomRoom;
