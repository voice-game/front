// 개발 중입니다.
// import React, { useState, useEffect, useRef } from "react";
// import io from "socket.io-client";

// import { USER_SERVER } from "../constants/constants";
// import { v4 as uuidv4 } from "uuid";

// const socket = io(USER_SERVER, {
//   withCredential: true,
// });

// const playerIdMock = uuidv4();

// const useMultiPlay = (roomId, playerData) => {
//   useEffect(() => {
//     socket.emit("join-room", {
//       roomId,
//       playerData,
//     });

//     socket.on("input-other-player", (data) => {
//       if (data.playerId !== playerIdMock) {
//         // data: {playerId, value}
//         console.log(data);
//       }
//     });

//     return () => {
//       socket.off("input-other-player");
//       socket.emit("leave-room");
//     };
//   }, []);
// };

// export default useMultiPlay;
