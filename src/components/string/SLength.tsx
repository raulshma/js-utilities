import React from 'react';
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';
export default function SLength() {
  let [value, setValue] = React.useState<string>('');
  let [count, setCount] = React.useState<number>(0);

  let handleInputChange = (e: any) => {
    let inputValue: string = e.target.value;
    setValue(inputValue);
    setCount(inputValue.length);
  };
  return (
    <React.Fragment>
      <Box m={'8px'}>
        <Heading mb={'8px'}>Calculates the length of string</Heading>
        <Flex gridGap={'4'}>
          <Textarea
            mb={'4px'}
            minHeight={'250px'}
            value={value}
            onChange={handleInputChange}
            placeholder="Enter/Paste text here"
            size="md"
          />
          <Center>
            <Text
              align={'center'}
              color="teal"
              minW={'96'}
              fontWeight="semibold"
              fontSize="6xl"
            >
              {count}
            </Text>
          </Center>
        </Flex>
      </Box>
    </React.Fragment>
  );
}
