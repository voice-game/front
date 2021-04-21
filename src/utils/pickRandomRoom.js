const pickRandomRoom = (roomList) => {
  const enterable = roomList.filter((room) => room.status === "Enter");
  const random = Math.floor(
    Math.random() * enterable.length + enterable.length
  );

  const picked = enterable[random];

  return !picked ? enterable[0] : picked;
};

export default pickRandomRoom;
