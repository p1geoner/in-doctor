"use client"
import styles from './SwiperImg.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import { Navigation } from 'swiper/modules';

const SwiperImg = ( ) => {
  const images =[
    {
      image: '/doc1.png'
    },
    {
      image: '/doc2.png'
    },
    {
      image: '/doc3.png'
    },
    {
      image: '/doc4.png'
    },
  ]
  return (
    <div id={'сертификаты'} className={styles.wrapper}>
      <h2 className={'title'}>Наши медсестры сертифицированы</h2>
      <Swiper  modules={[Navigation]} navigation={{nextEl: '.custom-next', prevEl: '.custom-prev'}} slidesPerView={'auto'} spaceBetween={20}>
        {images.map((item)=><SwiperSlide className={styles.slide} key={item.image}><Image src={item.image} width={700} height={530} alt={'404'}/></SwiperSlide>)}
      </Swiper>
      <div className="navigation">
        <div className="custom-next"></div>
        <div className="custom-prev"></div>
      </div>
    </div>
  );
};

export default SwiperImg;
