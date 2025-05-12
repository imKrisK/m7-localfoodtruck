import React, { useContext } from 'react';
import { EmojiContext } from './EmojiContext';

const Emoji = () => {
  const { emoji, switchEmoji } = useContext(EmojiContext);

  return (
    <div className="componentBox">
      <h3>Current Emoji: {emoji}</h3>
      <button onClick={switchEmoji}>Switch Emoji</button>
    </div>
  );
};

export default Emoji;