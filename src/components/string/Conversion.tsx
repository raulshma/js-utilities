import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text,
  Textarea,
  Tooltip,
  useClipboard,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { titleCase } from 'title-case';
import camelPascal from 'camelcase';
import './style.css';

enum ConvertCase {
  UpperCase = 1,
  LowerCase = 2,
  TitleCase = 3,
  CamelCase = 4,
  PascalCase = 5,
}

export default function Conversion() {
  const toast = useToast();

  let [textValue, setTextValue] = React.useState<string>('');
  let [output, setOutput] = React.useState<string>('');

  let [enableLocale, setEnableLocale] = React.useState<boolean>(true);
  let [preserveConsecutiveUppercase, setPreserveConsecutiveUppercase] =
    React.useState<boolean>(true);

  const { hasCopied, onCopy } = useClipboard(output);

  const handleTextInputChange = (e: any) => {
    const inputValue: string = e.target.value;
    setTextValue(inputValue);
  };

  const handleLocaleChange = (_: any) => {
    setEnableLocale(!enableLocale);
  };

  const handlePreserverConsecutiveChange = (_: any) => {
    setPreserveConsecutiveUppercase(!preserveConsecutiveUppercase);
  };

  const convertCase = (caseVal: ConvertCase): null => {
    let convertedString: string;
    const stringToConvert: string = textValue;
    switch (caseVal) {
      case ConvertCase.UpperCase:
        convertedString = enableLocale
          ? stringToConvert.toLocaleUpperCase()
          : stringToConvert.toUpperCase();
        break;
      case ConvertCase.LowerCase:
        convertedString = enableLocale
          ? stringToConvert.toLocaleLowerCase()
          : stringToConvert.toLowerCase();
        break;
      case ConvertCase.TitleCase:
        convertedString = titleCase(stringToConvert);
        break;
      case ConvertCase.CamelCase:
        convertedString = preserveConsecutiveUppercase
          ? camelPascal(stringToConvert, {
              pascalCase: false,
              preserveConsecutiveUppercase: true,
            })
          : camelPascal(stringToConvert, { pascalCase: false });
        break;
      case ConvertCase.PascalCase:
        convertedString = preserveConsecutiveUppercase
          ? camelPascal(stringToConvert, {
              pascalCase: true,
              preserveConsecutiveUppercase: true,
            })
          : camelPascal(stringToConvert, { pascalCase: true });
        break;
      default:
        convertedString = stringToConvert;
    }
    setOutput(convertedString);
    return null;
  };

  return (
    <React.Fragment>
      <Box m={'8px'}>
        <Heading mt="1rem" mb="2rem" size="lg">
          Extract a contiguous sequence of characters within a string
        </Heading>
        <Flex gridGap={'6'} border="teal" flexDirection="column">
          <FormControl display="flex" alignItems="center" mb="0">
            <FormLabel htmlFor="enableLocale" mb="0">
              Use Locale if possible
            </FormLabel>
            <Switch
              colorScheme="green"
              id="enableLocale"
              isChecked={enableLocale}
              onChange={handleLocaleChange}
            />
          </FormControl>
          <Flex flexDirection="row" gridGap={4}>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => convertCase(ConvertCase.UpperCase)}
            >
              UpperCase
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => convertCase(ConvertCase.LowerCase)}
            >
              LowerCase
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => convertCase(ConvertCase.TitleCase)}
            >
              TitleCase
            </Button>
            <Flex
              gridGap={4}
              px={2}
              borderRight="solid"
              borderRightWidth="2px"
              borderRightColor="purple.500"
              borderLeft="solid"
              borderLeftWidth="2px"
              borderLeftColor="purple.500"
            >
              <Center>
                <Tooltip
                  label="Preserve Consecutive Uppercase"
                  aria-label="Preserve Consecutive Uppercase"
                >
                  <FormControl
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="0"
                  >
                    <Switch
                      id="pCU"
                      colorScheme="purple"
                      isChecked={preserveConsecutiveUppercase}
                      onChange={handlePreserverConsecutiveChange}
                    />
                  </FormControl>
                </Tooltip>
              </Center>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={() => convertCase(ConvertCase.CamelCase)}
              >
                CamelCase
              </Button>
              <Button
                colorScheme="purple"
                size="sm"
                onClick={() => convertCase(ConvertCase.PascalCase)}
              >
                PascalCase
              </Button>
            </Flex>
          </Flex>
          <Textarea
            mb={'4px'}
            rows={3}
            value={textValue}
            onChange={handleTextInputChange}
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
