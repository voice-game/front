import { useState } from "react";

/**
 *
 * @param {number} listLength length of characterList
 * @returns ramdom index under listLength
 */
const useRandomCharacter = (listLength) => {
  const randomIndex = Math.random() * listLength;
  const floored = Math.floor(randomIndex);
  const [characterIndex, setCharacterIndex] = useState(floored);

  return characterIndex;
}

export default useRandomCharacter;
