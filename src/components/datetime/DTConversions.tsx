import {
  useToast,
  useClipboard,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Center,
  Tooltip,
  Textarea,
  Switch,
  Text,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import {
  format,
  formatISO,
  formatISO9075,
  formatRFC3339,
  formatRFC7231,
  intlFormat,
  isValid,
  toDate,
  parseISO,
  isToday,
  isTomorrow,
  isYesterday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  isWeekend,
  isDate,
} from 'date-fns';
import { isNumeric } from '../../helpers/functions';

enum ConversionTypes {
  Format,
  FormatISO,
  FormatISO9075,
  FormatRFC3339,
  FormatRFC7231,
  IntlFormat,
  IsToday,
  IsTomorrow,
  IsYesterday,
  IsMonday,
  IsTuesday,
  IsWednesday,
  IsThursday,
  IsFriday,
  IsSaturday,
  IsSunday,
  IsWeekend,
}

export default function DTConversions() {
  const toast = useToast();

  let [textValue, setTextValue] = React.useState<string>('');
  let [output, setOutput] = React.useState<string>(new Date().toString());

  const { hasCopied, onCopy } = useClipboard(output.toString());

  const handleTextInputChange = (e: any) => {
    const inputValue: string = e.target.value;
    setTextValue(inputValue);
  };

  const showToast = (success: boolean, message: string) => {
    if (success) {
      return toast({
        title: message,
        status: 'success',
        duration: 2000,
      });
    } else {
      return toast({
        title: message,
        status: 'info',
        duration: 2000,
      });
    }
  };

  const handleConversion = (ctype: ConversionTypes) => {
    const inputValue = isNumeric(textValue)
      ? Number(textValue)
      : new Date(textValue);
    if (isValid(inputValue) == false) return null;
    switch (ctype) {
      case ConversionTypes.Format:
        setOutput(toDate(inputValue).toString());
        break;
      case ConversionTypes.FormatISO:
        setOutput(formatISO(inputValue));
        break;
      case ConversionTypes.FormatISO9075:
        setOutput(formatISO9075(inputValue));
        break;
      case ConversionTypes.FormatRFC3339:
        setOutput(formatRFC3339(inputValue));
        break;
      case ConversionTypes.FormatRFC7231:
        setOutput(formatRFC7231(inputValue));
        break;
      case ConversionTypes.IntlFormat:
        setOutput(intlFormat(inputValue));
        break;
      case ConversionTypes.IsToday:
        isToday(inputValue) ? showToast(true, 'Yes') : showToast(false, 'No');
        break;
      case ConversionTypes.IsTomorrow:
        isTomorrow(inputValue)
          ? showToast(true, 'Yes')
          : showToast(false, 'No');
        break;
      case ConversionTypes.IsYesterday:
        isYesterday(inputValue)
          ? showToast(true, 'Yes')
          : showToast(false, 'No');
        break;
      case ConversionTypes.IsWeekend:
        isWeekend(inputValue) ? showToast(true, 'Yes') : showToast(false, 'No');
        break;
      case ConversionTypes.IsMonday:
        isMonday(inputValue) ? showToast(true, 'Yes') : showToast(false, 'No');
        break;
      case ConversionTypes.IsTuesday:
        isTuesday(inputValue) ? showToast(true, 'Yes') : showToast(false, 'No');
        break;
      case ConversionTypes.IsWednesday:
        isWednesday(inputValue)
          ? showToast(true, 'Yes')
          : showToast(false, 'No');
        break;
      case ConversionTypes.IsThursday:
        isThursday(inputValue)
          ? showToast(true, 'Yes')
          : showToast(false, 'No');
        break;
      case ConversionTypes.IsFriday:
        isFriday(inputValue) ? showToast(true, 'Yes') : showToast(false, 'No');
        break;
      case ConversionTypes.IsSaturday:
        isSaturday(inputValue)
          ? showToast(true, 'Yes')
          : showToast(false, 'No');
        break;
      case ConversionTypes.IsSunday:
        isSunday(inputValue) ? showToast(true, 'Yes') : showToast(false, 'No');
        break;
      default:
        null;
    }
  };

  return (
    <React.Fragment>
      <Box m={'8px'}>
        <Heading mt="1rem" mb="2rem" size="lg">
          Various datetime conversions
        </Heading>
        {output && (
          <Box my="1rem">
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
              my="4"
              border="solid"
              borderColor="gray.500"
              borderWidth="1px"
              fontSize="xl"
            >
              {output}
            </Text>
            <Input
              mb={'4px'}
              value={textValue}
              onChange={handleTextInputChange}
              placeholder="Enter date here"
              size="md"
            />
          </Box>
        )}
        <Flex gridGap={6} border="teal" flexDirection="row">
          <Flex gridGap={2} flexDirection="column">
            <Heading size="md">Common</Heading>

            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.Format)}
            >
              Format
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.FormatISO)}
            >
              FormatISO
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.FormatISO9075)}
            >
              FormatISO9075
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.FormatRFC3339)}
            >
              FormatRFC3339
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.FormatRFC7231)}
            >
              FormatRFC7231
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IntlFormat)}
            >
              IntlFormat
            </Button>
          </Flex>
          <Flex gridGap={2} flexDirection="column">
            <Heading size="md">Day Helpers</Heading>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsToday)}
            >
              IsToday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsTomorrow)}
            >
              IsTomorrow
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsYesterday)}
            >
              IsYesterday
            </Button>
          </Flex>
          <Flex gridGap={2} flexDirection="column">
            <Heading size="md">WeekDay Helpers</Heading>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsWeekend)}
            >
              IsWeekend
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsMonday)}
            >
              IsMonday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsTuesday)}
            >
              IsTuesday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsWednesday)}
            >
              IsWednesday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsThursday)}
            >
              IsThursday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsFriday)}
            >
              IsFriday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsSaturday)}
            >
              IsSaturday
            </Button>
            <Button
              colorScheme="green"
              size="sm"
              onClick={() => handleConversion(ConversionTypes.IsSunday)}
            >
              IsSunday
            </Button>
          </Flex>
        </Flex>
      </Box>
    </React.Fragment>
  );
}
