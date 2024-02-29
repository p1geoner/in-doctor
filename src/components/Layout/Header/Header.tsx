"use client"
// @ts-nocheck
import styles from './Header.module.scss'
import Link from "next/link";
import IcCity from '@/assets/icons/map.svg'
import {Button, LinkBtn} from "@/components/UI-Kit";
import IcPhone from '@/assets/icons/phone.svg'
import IcCart from '@/assets/icons/cart.svg'
import clsx from "clsx";
import {useEffect, useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import ProductStore from "@/store/ProductCard";
import {observer} from "mobx-react";
import {useRouter} from "next/navigation";
import IcClose from '@/assets/icons/cardClose.svg'
import ProductItem from "@/components/Layout/Header/ProductItem";
import {ProductCard} from "@/types/types";
const Header = observer(() => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [city, setCity] = useState<string | null>('Тверь')
  const productsStore = ProductStore
  const popoverStyles = clsx(styles.menu, {
    [styles.active]: isPopoverOpen
  })

  useEffect(() => {
    productsStore.setSum(0);
    let sumBuff = 0
    productsStore.productsCard.forEach((product)=>{
      sumBuff+=product.price*product.amount;
    })
    productsStore.setSum(sumBuff)
  }, [productsStore.productsCard]);


  useEffect(() => {
    if (!isPopoverOpen) {
      document.body.style.overflowY = 'initial';
      document.body.style.paddingRight = '0';
    } else {
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = 8 + 'px';
      document.documentElement.style.setProperty('--scroll-width', `10px`);
    }
    const productsLocalStorage =localStorage.getItem('card');
    if(productsLocalStorage !== null){
      productsStore.setProductsCard(JSON.parse(productsLocalStorage))
    }
    productsStore.setSum(0);
  }, [isPopoverOpen]);

  useEffect(() => {
    setPrevScrollPos(window.scrollY)

    const productsLocalStorage =localStorage.getItem('card');
    if(productsLocalStorage !== null){
      productsStore.setProductsCard(JSON.parse(productsLocalStorage));
    }
    setCity(localStorage.getItem('city') !== null ? localStorage.getItem('city') : 'Тверь')
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos: number = window.scrollY;
      const isScrollingDown: boolean = currentScrollPos > prevScrollPos;

      if (currentScrollPos >= 200) {
        setIsVisible(!isScrollingDown);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isVisible]);

  const headerStyles = clsx({
    [styles.header]: true,
    [styles.visible]: isVisible,
  })

  const clearCard = () => {
    localStorage.setItem('card', JSON.stringify([]));
    const productsLocalStorage =localStorage.getItem('card');
    if(productsLocalStorage !== null){
      productsStore.setProductsCard(JSON.parse(productsLocalStorage));
    }
    productsStore.setSum(0);
  }

  return (
    <>
      <div className={headerStyles}>
        <div className={styles.wrapper}>
          <Link className={styles.logo} href={'/'}>Наш доктор</Link>
          <nav>
            <Link href={'/#услуги'}>
              Услуги
            </Link>
            <Link href={'/#быстрый-заказ'}>
              Быстрый заказ
            </Link>
            <Link href={'/#преимущества'}>
              Преимущества
            </Link>
            <Link href={'/#сертификаты'}>
              Сертификаты
            </Link>
            <Link href={'/#партнеры'}>
              Партнеры
            </Link>
            <Link href={'/#вопросы'}>
              Вопросы
            </Link>
            <Link href={'/#отзывы'}>
              Отзывы
            </Link>
            <Link href={'/#сотрудничать'}>
              Сотрудничать
            </Link>
          </nav>
          <button className={styles.button}><IcCity />{city}</button>
          <div className={styles.buttons}>
            <LinkBtn href={''}><IcPhone /></LinkBtn>
            <div onClick={()=>setIsPopoverOpen(true)} className={styles.cardBtn}>
              {ProductStore.count >0 && <div>{ProductStore.count}</div>}
              <Button theme={'filled'}> <IcCart /></Button>
            </div>
          </div>
        </div>

      </div>
      <div onClick={()=>setIsPopoverOpen(!isPopoverOpen)} className={popoverStyles}>
        <div onClick={(event) => event.stopPropagation()} className={styles.wrapperMenu}>
          <div className={styles.wrapperMenuInner}>
            <div className={styles.menuHeader}>
              <h2>Корзина</h2>
              <button onClick={()=>setIsPopoverOpen(false)}><IcClose/></button>
            </div>
              {productsStore.productsCard.length !== 0 ?
                (<div className={styles.productWrapper}>
                  {productsStore.productsCard.map((product)=><ProductItem key={product.id} product={product}/>)}
                </div> ):
                (<div className={styles.noItems}>
                  <p>Корзина пуста</p>
                  <span>Добавьте в корзину хотя бы одну услугу</span>
                </div>)
              }
            {productsStore?.productsCard.length !== 0 &&
                <div className={styles.cardButtons}>
                    <div className={styles.menuHeader}>
                        <h2>Предварительный итог</h2>
                        <p>{productsStore.sum.toFixed(2)}₽</p>
                    </div>
                    <Button onClick={()=> {
                      router.push('/order');
                      setIsPopoverOpen(false);
                    }} style={{width: '100%', marginTop: '30px'}} theme={"filled"}>Продолжить</Button>
                    <Button onClick={()=>clearCard()} style={{width: '100%', marginTop: '4px'}} theme={"outlined"}>Очистить корзину</Button>
                </div>
            }
          </div>

        </div>
      </div>
    </>
  );
});

export default Header;