"use client"
import React, {FC, useEffect, useState} from 'react';

import styles from './ProductList.module.scss';
import {Category, ProductCard, ProductsResponse} from "@/types/types";
import {Button} from "@/components/UI-Kit";
import Cheap from "@/components/UI-Kit/Cheap/Cheap";
import ProductsService from "@/API/ProductsService";
import ProductItem from "@/components/ProductList/ProductItem";
import ProductStore from "@/store/ProductCard";
import {observer} from "mobx-react";

import IcSearch from '@/assets/icons/search.svg'
import IcFilter from '@/assets/icons/filter.svg'
import IcClose from '@/assets/icons/remove.svg'
import clsx from "clsx";
interface ProductsProps {
  productsList: ProductsResponse,
  categoriesList: any
}
const Productlist:FC<ProductsProps> = observer(({categoriesList,productsList}) => {
  const productStore = ProductStore;
  const [products, setProducts] = useState(productsList);
  const [categories, setCategories] = useState(categoriesList);
  const [pickedCategories,setPickedCategories]= useState<number[]>([]);
  const [search, setSearch]= useState('')
  const [openFilters, setOpenFilters] = useState(false);
  const [isMobile, setIsMobile]= useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, []);

  useEffect(() => {
    const productsLocalStorage =localStorage.getItem('card');
    if(productsLocalStorage !== null){
      productStore.setProductsCard(JSON.parse(productsLocalStorage));
    }
  }, [products, ProductStore.sum,ProductStore.count]);

  const fetchProducts = async (string: string)=>{
      const response = await ProductsService.getProduct(string);
      // @ts-ignore
      setProducts(response.data);
  }

  const fetchMoreProducts = async ()=>{
    const response = await ProductsService.getProduct(`?${products.next.split('?')[1]}`);
    // @ts-ignore
    response.data.results = [...products.results, ...response.data.results]
    // @ts-ignore
    setProducts(response.data);
  }

  const fetchProductsSearh = async ()=>{
    const response = await ProductsService.getProduct(`?categories_id=${pickedCategories.join(',')}&search=${search}`);
    // @ts-ignore
    setProducts(response.data);
  }

  const popupStyles = clsx(styles.filtersPopup,{
    [styles.active]: openFilters
  })

  useEffect(() => {
    if (!openFilters) {
      document.body.style.overflowY = 'initial';
      document.body.style.paddingRight = '0';
    } else {
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = 8 + 'px';
      document.documentElement.style.setProperty('--scroll-width', `10px`);
    }

  }, [openFilters]);

  return (
    <div id={'услуги'} className={styles.wrapper}>
      <h2>Услуги</h2>
      <div className={styles.filters}>
        <div className={styles.cheapsWrapper}>
          {categories.map((item:Category,index:number) => {
            const getNewProduct = async (isChecked:boolean)=>{
              if(isChecked){
                const updatedCategories = pickedCategories.filter(num => num !== item.id);
                setPickedCategories(updatedCategories)
                await fetchProducts(`?categories_id=${updatedCategories.join(',')}&search=${search}`)
              }else{
                const updatedCategories = [...pickedCategories, item.id];
                setPickedCategories(updatedCategories)
                await fetchProducts(`?categories_id=${updatedCategories.join(',')}&search=${search}`)
              }

            }
            return (<Cheap key={`category${item.id}`} isCheckedCheap={pickedCategories.includes(item.id)} onClickCheap={(isChecked:boolean)=>getNewProduct(isChecked)} theme={"outlined"}>{item.title}</Cheap>)
          })}
        </div>
        <div className={styles.searchWrapper}>
          <input placeholder={'Поиск по услугам'} onKeyDown={(e)=> e.key === 'Enter' && fetchProductsSearh()} onChange={(e)=> setSearch(e.target.value)} value={search} type="text"/>
          <IcSearch onClick={()=> fetchProductsSearh()} />
        </div>
        {isMobile && <Button className={styles.filterButton} onClick={()=> setOpenFilters(true)} theme={'outlined'}><IcFilter /> Фильтры</Button>}
        <div onClick={()=>setOpenFilters(false)} className={popupStyles}>
          <div onClick={(event) => event.stopPropagation()} className={styles.popupInner}>
            <div className={styles.filtersHeader}>
              <h2>Фильтры</h2>
              <IcClose onClick={()=>setOpenFilters(false)} />
            </div>
            <div className={styles.filtersBody}>
              {categories.map((item:Category,index:number) => {
                const getNewProduct = async (isChecked:boolean)=>{
                  if(isChecked){
                    const updatedCategories = pickedCategories.filter(num => num !== item.id);
                    setPickedCategories(updatedCategories)
                    await fetchProducts(`?categories_id=${updatedCategories.join(',')}&search=${search}`)
                  }else{
                    const updatedCategories = [...pickedCategories, item.id];
                    setPickedCategories(updatedCategories)
                    await fetchProducts(`?categories_id=${updatedCategories.join(',')}&search=${search}`)
                  }

                }
                return (<Cheap key={`category${item.id}`} isCheckedCheap={pickedCategories.includes(item.id)} onClickCheap={(isChecked:boolean)=>getNewProduct(isChecked)} theme={"outlined"}>{item.title}</Cheap>)
              })}
            </div>
            <div className={styles.filtersBottom}>
              <Button style={{width:'100%'}} onClick={()=> {
                setOpenFilters(false);
              }} theme={'filled'}>Показать</Button>
              <p onClick={()=> {
                setPickedCategories([]);
                setOpenFilters(false);
              }}>Сбросить фильтры</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.productsWrapper}>
        {products.results.map((product) => {
          return (<ProductItem cardProducts={productStore.productsCard} setCardProducts={productStore.setProductsCard}  product={product} />)
        })}
      </div>
      {products.next !== null && <Button style={{width:'100%',marginTop:'30px'}} theme={"outlined"} onClick={()=>{fetchMoreProducts()}} >Смотреть больше</Button>}
    </div>
  );

});

export default Productlist;