"use client"
import React, { FC } from 'react';

import styles from './ProductList.module.scss';
import {Product, ProductCard} from "@/types/types";

import CardButton from "@/components/UI-Kit/CartButton/CartButton";

interface ProductsProps {
  product: Product,
  cardProducts: ProductCard[],
  setCardProducts:(products: ProductCard[]) => void
}
const ProductItem:FC<ProductsProps> = ({product,setCardProducts,cardProducts,}) => {

  return (
    <div className={styles.itemWrapper}>
      <img src={product.image} alt=""/>
      <p className={styles.title}>{product.title}</p>
      <div>
        <CardButton  isCheckedCard={false} product={product} />
        {product.discount_price ? <p className={styles.price}><span>{product.discount_price}</span>{product.price}₽</p> : <p className={styles.price}>{product.price}₽</p> }
      </div>
     </div>
  );

};

export default ProductItem;