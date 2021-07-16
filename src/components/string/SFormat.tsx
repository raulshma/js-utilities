import React from 'react';
import {
  Box,
  Button,
  Center,
  Code,
  Divider,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  Textarea,
  useClipboard,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import './style.css';

export default function FString() {
  const toast = useToast();

  let [value, setValue] = React.useState<string>('');
  let [output, setOutput] = React.useState<string>('');

  let [space, setSpace] = React.useState<number>(4);

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
    formatString(inputValue);
  };

  const formatString = (localValue: string, spacing: string = '') => {
    try {
      const dataObj = JSON.parse(localValue);
      let localSpace;
      if (spacing === '') localSpace = space;
      else localSpace = spacing;
      const beautifiedJSON = JSON.stringify(dataObj, null, Number(localSpace));
      setOutput(beautifiedJSON);
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
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSpaceChange = (e: any) => {
    let inputValue: string = e.target.value;
    setSpace(Number(inputValue));
    formatString(value, inputValue);
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
                type="number"
                value={space}
                onChange={handleSpaceChange}
                size="sm"
              />
            </FormControl>
          </Flex>
          <Textarea
            mb={'4px'}
            minHeight={'185px'}
            value={value}
            onChange={handleInputChange}
            placeholder="Enter/Paste JSON here"
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
              fontSize="sm"
            >
              <pre>{output}</pre>
            </Box>
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}
