"use client"
import styles from './Feedback.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import { Navigation } from 'swiper/modules';
import {FC} from "react";
import Mark from '@/assets/icons/mark-feedback.svg'

type TFeedbackProps = {
  image: string,
  age: string,
  name: string,
  text: string,
}
const FeedbackItem: FC<TFeedbackProps> = ({image, age, text, name}) => {

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.header}>
        <div>
          <Image src={image} alt={'404'} width={50} height={50}/>
            <div>
              <p>{name}</p>
              <span>{age}</span>
            </div>
        </div>
        <Mark/>
      </div>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default FeedbackItem;