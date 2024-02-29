"use client"
import { FC } from 'react';
import {
  Accordion,
  AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel,
} from 'react-accessible-accordion';

import styles from './MainAccordion.module.scss';

interface MainAccordionProps {
  data: { title: string; content: string | JSX.Element; }[];
  isQuestionsPage?: boolean;
  isHousesListPage?: boolean;
}

const MainAccordion: FC<MainAccordionProps> = ({ data, isQuestionsPage, isHousesListPage }) => {

  return (
    <Accordion style={{width:'-webkit-fill-available'}} allowZeroExpanded={true} allowMultipleExpanded={true}>
      {data.map((item, index) => {
        return (
          <AccordionItem className={styles.item} key={index}>
            <AccordionItemHeading>
              <AccordionItemButton className={styles.button}>{item.title}</AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className={styles.content}>
                <p className={'color-dark'}>{item.content}</p>
            </AccordionItemPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default MainAccordion;
