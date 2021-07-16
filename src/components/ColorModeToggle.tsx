import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';

export default function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      variant="ghost"
      colorScheme="teal"
      aria-label="Color Mode Toggle"
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      mr={'5'}
    >
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </IconButton>
  );
}
