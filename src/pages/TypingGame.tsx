import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { random } from 'faker/locale/en_IND';

import TypingBasic from '../components/typing/TypingBasic';
import TypingOnInput from '../components/typing/TypingOnInput';
import TypingThroughText from '../components/typing/TypingThroughText';

export default function TypingGame() {
  let [text, setText] = useState<string>('');
  useEffect(() => {
    setText(random.words(150));
  }, []);

  const tabChanged = () => {
    setText(random.words(150));
  };
  return (
    <Tabs
      m="6"
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
      </TabList>

      <TabPanels>
        <TabPanel>{text && <TypingBasic text={text} />}</TabPanel>
        <TabPanel>{text && <TypingOnInput text={text} />}</TabPanel>
        <TabPanel>{text && <TypingThroughText text={text} />}</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
