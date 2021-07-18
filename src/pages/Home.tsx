import { Flex } from '@chakra-ui/react';
import React from 'react';
import CardItem from '../components/CardItem';

type ListItemType = {
  type: string;
  desc: string;
  title: string;
  path: string;
};

const ListItems: ListItemType[] = [
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

export default function Home() {
  return (
    <Flex wrap={'wrap'} gridGap={'6'} justify={'center'}>
      {ListItems.map((item, idx) => (
        <CardItem
          key={idx}
          title={item.title}
          desc={item.desc}
          type={item.type}
          path={item.path}
        />
      ))}
    </Flex>
  );
}
