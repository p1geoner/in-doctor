import styles from './Partners.module.scss'
import Image from "next/image";

const Partners = ( ) => {
  const images =[
    {
      image: '/partner-1.svg'
    },
    {
      image: '/partner-2.png'
    },
    {
      image: '/partner-3.png'
    },
    {
      image: '/partner-4.svg'
    },

  ]
  return (
    <div id={'партнеры'} className={styles.wrapper}>
      <h2 className={'title'}>Партнеры</h2>
      <div>{images.map((item)=><div><img src={item.image} alt="404"/></div>)}</div>
    </div>
  );
};

export default Partners;