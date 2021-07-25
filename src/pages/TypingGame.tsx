import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';
import '../components/typing/style.css';

import TypingBasic from '../components/typing/TypingBasic';
import TypingOnInput from '../components/typing/TypingOnInput';
import TypingThroughText from '../components/typing/TypingThroughText';
import { RandomParagraphs } from '../helpers/randomParagraphs';

export default function TypingGame() {
  let [localText, setLocalText] = useLocalStorage('text', RandomParagraphs);
  let [text, setText] = useState<string>('');
  let [wordsCount, setWordsCount] = useState<number>(0);
  useEffect(() => {
    getParagraph();
  }, []);

  const tabChanged = () => {
    setText('');
    getParagraph();
  };

  const getParagraph = () => {
    let values;
    try {
      values = JSON.parse(localText).values;
    } catch {}
    if (values && values.length == 50) {
      const randomInt = Math.floor(Math.random() * values.length);
      const para = values[randomInt];
      setWordsCount(para.split(' ').length);
      setText(para);
    } else {
      fetch(
        'https://whispering-retreat-75361.herokuapp.com/?url=http://metaphorpsum.com/paragraphs/1/16'
      )
        .then((res) => res.json())
        .then((response) => {
          const data = response.contents;
          if (localText.length > 0) {
            const { values }: { values: string[] } = JSON.parse(localText);
            if (values.length == 50) {
              values.splice(Math.floor(Math.random() * values.length), 1);
            }
            values.push(data);
            const para = values[Math.floor(Math.random() * values.length)];
            setWordsCount(para.split(' ').length);
            setText(para);
            setLocalText(JSON.stringify({ values: values }));
            console.log(`${values.length} Paragraphs in Storage`);
          } else {
            setLocalText(JSON.stringify({ values: [data] }));
            setText(data);
            setWordsCount(data.split(' ').length);
          }
        });
    }
  };
  return (
    <Tabs
      m="6"
      mt="1"
      isFitted
      isLazy
      onChange={tabChanged}
      variant="soft-rounded"
      colorScheme="green"
    >
      <TabList>
        <Tab>Typing Basic</Tab>
        <Tab>Typing On Input</Tab>
        <Tab>Typing Through Text</Tab>
        <Tab isDisabled>{wordsCount} Words</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>{text && <TypingBasic text={text} />}</TabPanel>
        <TabPanel>{text && <TypingOnInput text={text} />}</TabPanel>
        <TabPanel>{text && <TypingThroughText text={text} />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
