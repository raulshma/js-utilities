import React from 'react';
import { Box, Center, Flex, Heading, Text, Textarea } from '@chakra-ui/react';

export default function LengthCalculator() {
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
        <Heading mt="1rem" mb="2rem" size="lg">
          Calculates the length of string
        </Heading>
        <Flex gridGap={'4'}>
          <Center>
            <Text
              align={'center'}
              color="green.500"
              minW={'96'}
              fontWeight="semibold"
              fontSize="6xl"
            >
              {count}
            </Text>
          </Center>
          <Textarea
            mb={'4px'}
            minHeight={'250px'}
            value={value}
            onChange={handleInputChange}
            placeholder="Enter/Paste text here"
            size="md"
          />
        </Flex>
      </Box>
    </React.Fragment>
  );
}
