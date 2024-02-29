import { FC } from 'react';

import MainAccordion from "@/components/UI-Kit/MainAccordion/MainAccordion";

import styles from './Questions.module.scss'

import IcHelp from '@/assets/icons/help.svg'
import {Button} from "@/components/UI-Kit";
const Questions = ( ) => {
  const data =[
    {
      title:'Какие услуги предоставляют медсестры сервиса?',
      content: 'Наши медсестры выполняют любые медсестринские процедуры, перечисленные на нашем сайте, по назначению врача.'
    },
    {
      title: 'Как обеспечивается качество и безопасность услуг, предоставляемых медсестрами?',
      content: 'Мы тщательно проверяем квалификацию и лицензии всех медсестер, регистрирующихся на нашем сайте. Также мы проводим регулярные оценки качества их работы и соблюдаем строгие стандарты безопасности и конфиденциальности, чтобы обеспечить высокий уровень услуг для наших клиентов.'
    },
    {
      title: 'Как можно вызвать медсестру?',
      content: 'Для вызова медсестры достаточно позвонить нам или оформить быстрый заказ'
    },
    {
      title: 'Могу ли я связаться с медсестрой до того, как назначить встречу?',
      content: 'После того, как вы оставите заявку по телефону или с помощью онлайн-заявки, в течение 3 минут вам перезвонит наша медсестра и уточнит все детали вашего заказа.'
    },
    {
      title: 'Как происходит оплата услуг медсестры?',
      content: 'Вы оплачиваете заказ только после его выполнения медсестрой, можно расплатиться наличными или переводом на карту медсестре.'
    }
  ]
  return (
   <div id={'вопросы'} className={styles.wrapper}>
     <h2 className={'title'}>Вопросы и ответы</h2>
     <div className={styles.innerWrapper}>
        <MainAccordion  data={data}></MainAccordion>
        <div className={styles.help}>
          <div>
            <IcHelp></IcHelp>
            <p> Не нашли ответ на свой вопрос?</p>
          </div>
          <a style={{width:'100%'}} className={styles.link} href="">Позвонить в поддержку</a>
          {/*<Button  theme={"filled"}>Позвонить в поддержку</Button>*/}
        </div>
     </div>
   </div>
  );
};

export default Questions;
