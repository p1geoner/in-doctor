"use client"
import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <h2>Наш доктор</h2>
        <div className={styles.links}>
          <a href="tel:+79955373712">+7 (995) 537-37-12</a>
          <a href="https://t.me/+79955373712">Telegram</a>
          <a target={'_blank'} href="https://api.whatsapp.com/send/?phone=79955373712&text&type=phone_number&app_absent=0">WhatsApp</a>
        </div>
      </div>
      <div className={styles.underLine}>
        <p>All rights reserved © 2024</p>
        <div className={styles.underLinks}>
          <a href="/политика_конфиденциальности.docx" download>Политика конфиденциальности </a>
          <a href="/пользовательское_соглашение.docx" download>Пользовательское соглашение</a>
        </div>
      </div>
    </div>
  );

};

export default Footer;