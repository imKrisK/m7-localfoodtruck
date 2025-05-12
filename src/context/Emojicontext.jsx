import React, { createContext, useContext, useState } from 'react';

const EmojiContext = createContext();

export const useEmoji = () => {
  return useContext(EmojiContext);
};

export const EmojiProvider = ({ children }) => {
  const [emoji, setEmoji] = useState('😊');

  const switchEmoji = () => {
    const emojis = ['😊', '😂', '😎', '😢', '😡'];
    const nextEmoji = emojis[(emojis.indexOf(emoji) + 1) % emojis.length];
    setEmoji(nextEmoji);
  };

  return (
    <EmojiContext.Provider value={{ emoji, switchEmoji }}>
      {children}
    </EmojiContext.Provider>
  );
};