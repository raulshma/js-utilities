import React from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useClipboard,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import './style.css';

export default function SubString() {
  const toast = useToast();

  let [value, setValue] = React.useState<string>('');
  let [output, setOutput] = React.useState<string>('');

  let [start, setStart] = React.useState<string>('');
  let [end, setEnd] = React.useState<string>('');

  const { hasCopied, onCopy } = useClipboard(output);

  const handleInputChange = (e: any) => {
    let inputValue: string = e.target.value;
    setValue(inputValue);
  };

  const handleStartChange = (e: any) => {
    let inputValue: string = e.target.value;
    setStart(inputValue);
  };

  const handleEndChange = (e: any) => {
    let inputValue: string = e.target.value;
    setEnd(inputValue);
  };

  const processString = (e: any) => {
    if (start === '' || end === '')
      return toast({
        title: 'Required.',
        description: 'Start and end values are needed.',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
    if (value === '' || value.length === 0)
      return toast({
        title: 'Required.',
        description: 'Text is required.',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });

    setOutput(value.substring(Number(start), Number(end)));
    return toast({
      title: 'Success.',
      status: 'success',
      duration: 2000,
    });
  };
  return (
    <React.Fragment>
      <Box m={'8px'}>
        <Heading mt="1rem" mb="2rem" size="lg">
          Extract a contiguous sequence of characters within a string
        </Heading>
        <Flex gridGap={'6'} border="teal">
          <Flex flexDirection="column">
            <FormControl id="start">
              <FormLabel>Start</FormLabel>
              <Input
                type="number"
                value={start}
                onChange={handleStartChange}
                size="sm"
              />
            </FormControl>
            <FormControl id="end">
              <FormLabel>End</FormLabel>
              <Input
                type="number"
                value={end}
                onChange={handleEndChange}
                size="sm"
              />
            </FormControl>
            <Button colorScheme="green" mt="4" onClick={processString}>
              Process
            </Button>
          </Flex>
          <Textarea
            mb={'4px'}
            minHeight={'185px'}
            value={value}
            onChange={handleInputChange}
            placeholder="Enter/Paste text here"
            size="md"
          />
        </Flex>
        {output && (
          <Box mt="2rem">
            <Button
              onClick={onCopy}
              size="sm"
              className="copy-button"
              colorScheme="green"
            >
              {hasCopied ? 'Copied' : 'Copy'}
            </Button>
            <Text
              p="6"
              mt="4"
              border="solid"
              borderColor="gray.500"
              borderWidth="1px"
              fontSize="xl"
            >
              {output}
            </Text>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
