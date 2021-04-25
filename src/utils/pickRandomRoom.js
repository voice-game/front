/**
 *
 * @param {*} roomList
 * @returns
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
