"use client"
import {LinkBtn} from "@/components/UI-Kit";

import styles from "./Intro.module.scss";

const IntroLinks = () => {

  return (
    <div className={styles.links}>
      <LinkBtn href={'/#услуги'} theme={'filled'}>Выбрать услугу</LinkBtn>
      <LinkBtn href={'/#сотрудничать'} theme={"outlined"}>Сотрудничать</LinkBtn>
    </div>
  );
};

export default IntroLinks;
