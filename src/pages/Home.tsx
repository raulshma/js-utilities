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
    desc: 'Calculate string length',
    type: 'STRING',
    path: 'slength',
  },
  {
    title: 'SubString',
    desc: 'Get a part of the string using start and end index',
    type: 'STRING',
    path: 'sstring',
  },
  {
    title: 'Replacer',
    desc: 'Replace string characters',
    type: 'STRING',
    path: '',
  },
  {
    title: 'Formatter',
    desc: 'Format json string',
    type: 'STRING',
    path: '',
  },
  {
    title: 'Case Conversion',
    desc: 'Convert to lower, upper, title, castle etc',
    type: 'STRING',
    path: '',
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
