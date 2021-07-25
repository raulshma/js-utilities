import React from 'react';
import { Box, Container, Text, Center } from '@chakra-ui/react';
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
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
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

  const durationCalculate = (millis: number) => {
    if (millis == 0)
      return 'Click on text and start Typing / Press ESC to reset';
    const minutes = Math.floor(millis / 60000);
    const seconds: number = Number(((millis % 60000) / 1000).toFixed(0));
    return `Elapsed ${
      seconds == 60
        ? minutes + 1 + ':00'
        : minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    }`;
  };

  return (
    <Box>
      <Center>
        <Text fontSize="large" p="2">
          {durationCalculate(getDuration())}
        </Text>
      </Center>
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
    </Box>
  );
}
