import React from 'react';
import { Button } from '@chakra-ui/react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type CardItemProps = {
  type: string;
  desc: string;
  title: string;
  path: string;
};

export default function CardItem({ type, desc, title, path }: CardItemProps) {
  return (
    <Box
      w="360px"
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'md'}
      p={6}
      overflow={'hidden'}
    >
      <Stack>
        <Text
          color={'green.500'}
          textTransform={'uppercase'}
          fontWeight={800}
          fontSize={'sm'}
          letterSpacing={1.1}
        >
          {type}
        </Text>
        <Heading
          color={useColorModeValue('gray.700', 'white')}
          fontSize={'2xl'}
          fontFamily={'body'}
        >
          {title}
        </Heading>
        <Text color={'gray.500'}>{desc}</Text>
      </Stack>
      <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
        <Button colorScheme="green" as={Link} to={'/' + path}>
          GO
        </Button>
      </Stack>
    </Box>
  );
}
