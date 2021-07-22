import {
  useToast,
  useClipboard,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function SToArray() {
  const toast = useToast();

  let [value, setValue] = React.useState<string>('');
  let [output, setOutput] = React.useState<string>('');

  let [seperator, setSeperator] = React.useState<string>(' ');

  const { hasCopied, onCopy } = useClipboard(output);

  const handleInputChange = (e: any) => {
    let inputValue: string = e.target.value;
    setValue(inputValue);
    if (inputValue.length === 0 || inputValue === '') {
      return toast({
        title: 'Required.',
        description: 'Text is required.',
        status: 'info',
        duration: 4000,
        isClosable: true,
      });
    }
    convertToArray(inputValue, seperator);
  };

  const convertToArray = (localValue: string, seperator: string = ' ') => {
    try {
      const arrayOfWords = localValue.split(seperator);
      setOutput(JSON.stringify(arrayOfWords));
      toast({
        title: 'Success.',
        status: 'success',
        duration: 2000,
      });
    } catch (ex: any) {
      toast({
        title: 'Failed.',
        description: ex.message,
        status: 'error',
        duration: 10000,
        isClosable: true,
      });
    }
  };

  const handleSeperatorChange = (e: any) => {
    let inputValue: string = e.target.value;
    setSeperator(inputValue);
    convertToArray(value, inputValue);
  };

  return (
    <React.Fragment>
      <Box m={'8px'}>
        <Heading mt="1rem" mb="2rem" size="lg">
          Basic JSON Beautifier
        </Heading>
        <Flex gridGap={'6'} border="teal">
          <Flex flexDirection="column">
            <FormControl id="space">
              <FormLabel>Spacing</FormLabel>
              <Input
                type="text"
                value={seperator}
                onChange={handleSeperatorChange}
                size="sm"
              />
            </FormControl>
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
            <Box
              p="6"
              mt="4"
              border="solid"
              borderColor="gray.500"
              borderWidth="1px"
              fontSize="large"
            >
              <Text>{output}</Text>
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
