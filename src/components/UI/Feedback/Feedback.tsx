"use client"
import styles from './Feedback.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import { Navigation } from 'swiper/modules';
import FeedbackItem from "@/components/UI/Feedback/FeedbackItem";

const Feedback = () => {
  const feedbacks =[
    {
      image: '/feedback-2.jpg',
      name: 'Анна',
      age: '34 года',
      text: 'Я искала медсестру для ухода за моей пожилой мамой, и этот сайт оказался настоящим спасением. Процесс поиска был прост и удобен, а медсестра, которую мы нашли, оказалась настоящим профессионалом. Она не только предоставляла высококачественный уход, но и стала частью нашей семьи. Благодарю за такую замечательную услугу!'
    },
    {
      image: '/feedback-1.jpg',
      name: 'Игорь',
      age: '42 года',
      text: 'После операции мне была необходима помощь в восстановлении, и я обратился к этому сайту. Нашел здесь замечательную медсестру, которая помогала мне с реабилитацией. Очень доволен тем, как быстро и легко мне удалось найти подходящего специалиста. Рекомендую всем, кто ищет качественный медицинский уход на дому'
    },
    {
      image: '/feedback-3.jpg',
      name: 'Михаил',
      age: '25 лет',
      text: 'Я искал медсестру для регулярного ухода за моим отцом, который страдает хроническим заболеванием. На этом сайте я нашел квалифицированную медсестру, которая не только заботится о здоровье моего отца, но и поддерживает его дух. Очень благодарен за предоставленную услугу и высокий уровень профессионализма.'
    },
  ]
  return (
    <div id={'отзывы'} className={styles.wrapper}>
      <h2 className={'title'}>Отызвы</h2>
      <Swiper  modules={[Navigation]} navigation={{nextEl: '.custom-next-feedback', prevEl: '.custom-prev-feedback'}} slidesPerView={'auto'} spaceBetween={20}>
        {feedbacks.map((item)=><SwiperSlide className={styles.slide} key={item.image}><FeedbackItem image={item.image} age={item.age} name={item.name} text={item.text} /></SwiperSlide>)}
      </Swiper>
      <div className="navigation">
        <div className="custom-next-feedback"></div>
        <div className="custom-prev-feedback"></div>
      </div>
    </div>
  );
};

export default Feedback;