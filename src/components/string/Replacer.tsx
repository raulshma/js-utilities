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
import Highlighter from 'react-highlight-words';
import './style.css';

export default function Replacer() {
  const toast = useToast();

  let [value, setValue] = React.useState<string>('');
  let [output, setOutput] = React.useState<string>('');

  let [oldChars, setOldChars] = React.useState<string>('');
  let [newChars, setNewChars] = React.useState<string>('');

  let [words, setWords] = React.useState<string[]>([]);
  let [replaced, setReplaced] = React.useState<string[]>([]);

  const { hasCopied, onCopy } = useClipboard(output);

  const handleInputChange = (e: any) => {
    let inputValue: string = e.target.value;
    setValue(inputValue);
  };

  const handleOldChange = (e: any) => {
    let inputValue: string = e.target.value;
    setOldChars(inputValue);
    const items = inputValue.split(' ');
    if (items && items.length > 0) {
      setWords(items);
    }
  };

  const handleNewChange = (e: any) => {
    let inputValue: string = e.target.value;
    setNewChars(inputValue);
    if (oldChars === '') return;
    processString(null, inputValue);
  };

  const processString = (e: any, newString: string = '') => {
    if (oldChars === '')
      return toast({
        title: 'Required.',
        description: 'Find cannot be empty.',
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

    const newValue = newString === '' ? newChars : newString;
    setOutput(value.replaceAll(oldChars, newValue));
    if (newString !== '') {
      setReplaced(newValue.split(' '));
      return null;
    }
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
              <FormLabel>Find</FormLabel>
              <Input
                type="text"
                value={oldChars}
                onChange={handleOldChange}
                size="sm"
              />
            </FormControl>
            <FormControl id="end">
              <FormLabel>Replace</FormLabel>
              <Input
                type="text"
                value={newChars}
                onChange={handleNewChange}
                size="sm"
              />
            </FormControl>
            <Button colorScheme="green" mt="4" onClick={processString}>
              Replace
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
        <Flex>
          {value && (
            <Box
              w="50%"
              mt="2rem"
              p="6"
              border="solid"
              borderWidth="1px"
              borderColor="gray.500"
              fontSize="sm"
              maxH="400px"
              overflowY="scroll"
            >
              <Highlighter
                highlightClassName="highlight-text"
                searchWords={words}
                autoEscape={true}
                textToHighlight={value}
                caseSensitive={true}
              />
            </Box>
          )}
          {output && (
            <Box
              w="50%"
              mt="2rem"
              p="6"
              border="solid"
              borderWidth="1px"
              borderColor="gray.500"
              fontSize="sm"
              maxH="400px"
              overflowY="scroll"
            >
              <Button
                onClick={onCopy}
                size="sm"
                className="copy-button"
                colorScheme="green"
              >
                {hasCopied ? 'Copied' : 'Copy'}
              </Button>
              <Highlighter
                highlightClassName="highlight-text"
                searchWords={replaced}
                autoEscape={true}
                textToHighlight={output}
                caseSensitive={true}
              />
            </Box>
          )}
        </Flex>
      </Box>
    </React.Fragment>
  );
}
