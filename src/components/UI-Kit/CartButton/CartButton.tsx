"use client"

import {observer} from "mobx-react";
import { FC, useEffect, useState} from 'react';
import clsx from 'clsx';

import ProductStore from "@/store/ProductCard";

import { TButtonProps} from './types';
import { ProductCard } from "@/types/types";

import styles from './CartButton.module.scss';

import IcPlus from '@/assets/icons/plus-white.svg'
import IcMinus from '@/assets/icons/minus-white.svg'


const CardButton: FC<TButtonProps> = observer(({
                                    theme = 'outlined',
                                    type = 'button',
                                    size = 'default',
                                    className = '',
                                    product,
                                    isCheckedCard,
                                    reference,
                                    ...props
                                  }) => {
  const productStore = ProductStore

  useEffect(() => {
    setFoundItem(productStore.productsCard.find((item)=> item.id === product.id))
  }, [productStore.productsCard,productStore.sum,productStore.count]);

  const isProductInCard = productStore.productsCard?.some((item: ProductCard) => item.id === product.id);
  const [foundItem,setFoundItem] = useState(productStore.productsCard.find((item)=> item.id === product.id))

  const buttonStyle: string = clsx(styles.button, styles.defaultSize, {
    [className]: className,
    [styles.filled]: isProductInCard,
    [styles.outlined]: theme === 'outlined',
  });

  const AddToCard = ()=>{
    const productToCard:ProductCard = {
      id: product.id,
      price: product.price,
      discount_price: product.discount_price,
      amount: 1,
      image: product.image,
      title: product.title
    }
    productStore.setProductsCard([...productStore.productsCard, productToCard])
  }

  const AddAmount = (type: '-' | '+')=> {
      if(foundItem) {
        if(type === '+'){
          foundItem.amount +=1;
        }else{
          foundItem.amount -=1;
        }
        if(foundItem.amount !==0){
          const updatedProducts = productStore.productsCard.map((product) => {
            if (product.id === foundItem.id) {
              return foundItem;
            } else {
              return product;
            }
          });
          productStore.setProductsCard(updatedProducts);
        }else{
          const updatedProducts = productStore.productsCard.filter((product) => product.id !== foundItem.id);
          productStore.setProductsCard(updatedProducts);
        }
      }
  }

  return (
    <>
      {!isProductInCard ?
        (<button onClick={()=>AddToCard()}
                 ref={reference}
                 type={type}
                 className={buttonStyle}
                 {...props}>В корзину</button>):
      <>
        <div className={`${styles.defaultSize} ${styles.button} ${styles.filledDiv}`}>
          <button onClick={()=>AddAmount('-')}><IcMinus/></button>
          {foundItem?.amount}
          <button onClick={()=>AddAmount('+')}><IcPlus/></button>
        </div>
      </>
      }

    </>

  );
});

export default CardButton;
