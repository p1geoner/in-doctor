import styles from './Intro.module.scss'

import {LinkBtn} from "@/components/UI-Kit";
import IntroLinks from "@/components/UI/Intro/IntroLinks";

const Intro = ({title, subTitle}:{title:string, subTitle:string}) => {

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </div>
        <IntroLinks></IntroLinks>
      </div>
    </div>
  );
};

export default Intro;