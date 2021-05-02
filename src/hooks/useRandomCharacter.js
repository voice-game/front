import { useState } from "react";

/**
 *
 * @param {number} listLength length of characterList
 * @returns ramdom index under listLength
 */
const useRandomCharacter = (image) => {
  const listLength = image.characters ? image.characters.length : 0;

  const randomIndex = Math.random() * listLength;
  const floored = Math.floor(randomIndex);
  const [characterIndex, setCharacterIndex] = useState(floored);

  return characterIndex;
}

export default useRandomCharacter;
