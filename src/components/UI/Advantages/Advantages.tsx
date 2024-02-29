import styles from './Advantages.module.scss'

const Advantages = ( ) => {
  const items =[
      {
        title: 'от 200 ₽',
        description: 'Цены на наши услуги начинаются от 200 рублей'
      },
      {
        title: '23+',
        description: 'Видов медицинских процедур на дому'
      },
      {
        title: '24/7',
        description: 'Наша служба поддержки работает круглосуточно'
      },
      {
        title: '',
        description: '',
        disabled: true
      },
      {
        title: '',
        description: '',
        disabled: true
      },
      {
        title: '3 года',
        description: 'На рынке медицинских услуг более трех лет'
      },
      {
        title: '3 мин.',
        description: 'Обещаем обработку вашего заказа в течение 3 минут'
      },
      {
        title: '2 уровня',
        description: 'Каждая услуга проходит через двойной контроль качества'
      },
  ]

  const itemsFirstRow = items.map((item)=>{
    if(item?.disabled === true){
      return <div className={styles.disabled}></div>
    }
    return(<div className={styles.advantage} key={item.title}> <h3>{item.title}</h3> <p>{item.description}</p></div>)
  })
  return (
    <div id={'преимущества'} className={styles.wrapper}>
      <h2 className={'title'}>Партнеры</h2>
      <div className={styles.topRow}>{itemsFirstRow}</div>
      {/*<div className={styles.bottomRow}>{itemsSecondRow}</div>*/}
      {/*<div className={styles.adaptiveRow}>{itemsFirstRow}{itemsSecondRow}</div>*/}
    </div>
  );
};

export default Advantages;