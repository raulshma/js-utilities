import { Box, Center, Text } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useTyping from 'react-typing-game-hook';

export default function TypingThroughText({ text }: { text: string }) {
  const [duration, setDuration] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const letterElements = useRef<HTMLDivElement>(null);

  const {
    states: {
      charsState,
      currIndex,
      phase,
      correctChar,
      errorChar,
      startTime,
      endTime,
    },
    actions: { insertTyping, deleteTyping, resetTyping, getDuration },
  } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: false });

  // set cursor
  const pos = useMemo(() => {
    if (currIndex !== -1 && letterElements.current) {
      let spanref: any = letterElements.current.children[currIndex];
      let left = spanref.offsetLeft + spanref.offsetWidth - 2;
      let top = spanref.offsetTop - 2;
      return { left, top };
    } else {
      return {
        left: -2,
        top: 2,
      };
    }
  }, [currIndex]);

  //set WPM
  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  //handle key presses
  const handleKeyDown = (letter: string, control: boolean) => {
    if (letter === 'Escape') {
      resetTyping();
    } else if (letter === 'Backspace') {
      deleteTyping(control);
    } else if (letter.length === 1) {
      insertTyping(letter);
    }
  };

  const durationCalculate = (millis: number) => {
    if (millis == 0) return 'Click on text and start Typing / Press ESC to reset';
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
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`text-xl outline-none relative font-serif`}
        style={{ outline: 'none' }}
      >
        <div
          ref={letterElements}
          className="tracking-wide pointer-events-none outline-none select-none mb-4"
          tabIndex={0}
        >
          {text.split('').map((letter, index) => {
            let state = charsState[index];
            let color =
              state === 0
                ? 'text-gray-700'
                : state === 1
                ? 'text-gray-400'
                : 'text-red-500';
            return (
              <span key={letter + index} className={`${color}`}>
                {letter}
              </span>
            );
          })}
        </div>
        {phase !== 2 && isFocused ? (
          <span
            style={{
              left: pos.left,
              top: pos.top,
            }}
            className={`caret border-l-2 border-black`}
          >
            &nbsp;
          </span>
        ) : null}
      </Box>
      <p className="text-sm">
        {phase === 2 && startTime && endTime ? (
          <>
            <span className="text-green-500 mr-4">
              WPM: {Math.round(((60 / duration) * correctChar) / 5)}
            </span>
            <span className="text-blue-500 mr-4">
              Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
            </span>
            <span className="text-yellow-500 mr-4">Duration: {duration}s</span>
          </>
        ) : null}
        <span className="mr-4"> Current Index: {currIndex}</span>
        <span className="mr-4"> Correct Characters: {correctChar}</span>
        <span className="mr-4"> Error Characters: {errorChar}</span>
      </p>
    </Box>
  );
}
