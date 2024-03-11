"use client"
import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';

import styles from './ProductList.module.scss';
import {Category, Product, ProductCard, ProductsResponse} from "@/types/types";
import {Button} from "@/components/UI-Kit";
import Cheap from "@/components/UI-Kit/Cheap/Cheap";
import CardButton from "@/components/UI-Kit/CartButton/CartButton";
import IcRemove from '@/assets/icons/remove.svg'
import ProductStore from "@/store/ProductCard";
interface ProductsProps {
  product: ProductCard,
}
const ProductItem:FC<ProductsProps> = ({product}) => {
  const productStore = ProductStore
  const removeItem = () => {
    const updatedProducts = productStore.productsCard.filter((item) => item.id !== product.id);
    productStore.setProductsCard(updatedProducts);

  }

  return (
    <div className={styles.itemWrapper}>
      <div className={styles.adaptiveRemove}><IcRemove onClick={()=>removeItem()}/></div>
      <img src={product.image} alt=""/>
      <div>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.button}>
          <CardButton isCheckedCard={false} product={product} />
          {product.discount_price ? <p className={styles.price}><span>{product.price}</span>{product.discount_price}₽</p> : <p className={styles.price}>{product.price}₽</p> }

        </div>
      </div>
      <div className={styles.remove}><IcRemove onClick={()=>removeItem()}/></div>

     </div>
  );

};

export default ProductItem;