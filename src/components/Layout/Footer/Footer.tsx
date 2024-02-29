"use client"
import React from 'react';

import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <h2>Наш доктор</h2>
        <div className={styles.links}>
          <a href="">VK</a>
          <a href="">Telegram</a>
          <a href="">WhatsApp</a>
        </div>
      </div>
      <div className={styles.underLine}>
        <p>All rights reserved © 2024</p>
        <div className={styles.underLinks}>
          <a href="">Политика конфиденциальности </a>
          <a href="">Условия и положения</a>
        </div>
      </div>
    </div>
  );

};

export default Footer;