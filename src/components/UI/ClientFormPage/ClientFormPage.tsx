import React from 'react';

import Form from "@/components/UI/Form/ClientForm";

import styles from './ClientFormPage.module.scss';

const ClientForm = () => {

  return (
    <div id={'быстрый-заказ'} className={styles.wrapper}>
      <h2>Быстрый заказ</h2>
      <div>
        <p className={styles.text}>Блок создан специально для того, чтобы облегчить вам процесс получения необходимых уходовых и медицинских услуг, минуя сложности с выбором и добавлением услуг в корзину. <br/>
        <br/>  Вам всего лишь нужно заполнить простую форму, это поможет нам подобрать для вас наиболее подходящего специалиста. Наша цель — предоставить вам быстрый доступ к высококачественному уходу и медицинской поддержке, учитывая ваши индивидуальные потребности и предпочтения.</p>
        <Form></Form>
      </div>
    </div>

  );
};

export default ClientForm;