import React from 'react';

import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
