import React, { useState } from 'react';

const Emoji = () => {
  const [emoji, setEmoji] = useState('😊');

  const switchEmoji = () => {
    const emojis = ['😊', '😂', '😎', '😢', '😡'];
    const nextEmoji = emojis[(emojis.indexOf(emoji) + 1) % emojis.length];
    setEmoji(nextEmoji);
  };

  return (
    <div className="componentBox">
      <h3>Current Emoji: {emoji}</h3>
      <button onClick={switchEmoji}>Switch Emoji</button>
    </div>
  );
};

export default Emoji;