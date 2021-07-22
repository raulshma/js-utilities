import {
  Badge,
  Box,
  Flex,
  Grid,
  Heading,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import CardItem from '../components/CardItem';
import { Divider } from '@chakra-ui/react';

type ListItemType = {
  type: string;
  desc: string;
  title: string;
  path: string;
};

const ListItemsString: ListItemType[] = [
  {
    title: 'Length',
    desc: 'Counts no of characters in string',
    type: 'STRING',
    path: 'slength',
  },
  {
    title: 'SubString',
    desc: 'Extract a contiguous sequence of characters within a string. For instance, "the best of" is a substring of "It was the best of times".',
    type: 'STRING',
    path: 'sstring',
  },
  {
    title: 'Replacer',
    desc: 'Replace string characters',
    type: 'STRING',
    path: 'sreplacer',
  },
  {
    title: 'Formatter',
    desc: 'Format json string',
    type: 'STRING',
    path: 'sformater',
  },
  {
    title: 'Case Conversion',
    desc: 'Convert to lower, upper, title, castle etc',
    type: 'STRING',
    path: 'sconversion',
  },
];
const ListItemsDateTime: ListItemType[] = [
  {
    title: 'Date Conversions',
    desc: 'Different datetime conversions',
    type: 'DATETIME',
    path: 'dtconversion',
  },
];

export default function Home() {
  return (
    <Stack spacing="1rem" mb="4rem">
      <Grid placeItems="center">
        <Badge variant="outline" colorScheme="green">
          <Heading>Strings</Heading>
        </Badge>
      </Grid>
      <Flex wrap={'wrap'} gridGap={'6'} justify={'center'}>
        {ListItemsString.map((item, idx) => (
          <CardItem
            key={idx}
            title={item.title}
            desc={item.desc}
            type={item.type}
            path={item.path}
          />
        ))}
      </Flex>
      <Grid placeItems="center">
        <Badge variant="outline" colorScheme="green" mt="3rem">
          <Heading>DateTime</Heading>
        </Badge>
      </Grid>
      <Flex wrap={'wrap'} gridGap={'6'} justify={'center'}>
        {ListItemsDateTime.map((item, idx) => (
          <CardItem
            key={idx}
            title={item.title}
            desc={item.desc}
            type={item.type}
            path={item.path}
          />
        ))}
      </Flex>
    </Stack>
  );
}
