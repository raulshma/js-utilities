import React from 'react';
import { Box, Container, Text } from '@chakra-ui/react';
import useTypingGame from 'react-typing-game-hook';

export default function TypingBasic({ text }: { text: string }) {
  const {
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime,
    },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(text);

  const handleKey = (key: any) => {
    if (key === 'Escape') {
      resetTyping();
    } else if (key === 'Backspace') {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
  };

  return (
    <Box
      className="text-xl select-none outline-none"
      onKeyDown={(e) => {
        handleKey(e.key);
        e.preventDefault();
      }}
      tabIndex={0}
    >
      {text.split('').map((char: string, index: number) => {
        let state = charsState[index];
        let color = state === 0 ? 'black' : state === 1 ? 'green' : 'red';
        return (
          <span
            key={char + index}
            style={{ color }}
            className={currIndex + 1 === index ? 'currLetter' : ''}
          >
            {char}
          </span>
        );
      })}
    </Box>
  );
}
