"use client"
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
import base64 from 'base64-encode-file'

import styles from './Form.module.scss';
import FeedbackService from "@/API/FeedbackService";
import {Button, Select, TextField} from "@/components/UI-Kit";
import SingleFileUpload from "./SingleFileUpload/SingleFileUpload";
import clsx from "clsx";
import ProductCard from "@/store/ProductCard";
import ProductItem from "./ProductItem/ProductItem";
import {observer} from "mobx-react";

import IcHome from '@/assets/icons/home.svg'
import {useRouter} from "next/navigation";

export type ProductOrder = {
  id: number,
  amount: number
}

export type FormFields = {
  address: string,
  firstName: string,
  phone: string,
  description: string,
  delivery: number,
  directionImage: string
};

const Form = observer(() => {
  const router = useRouter();
  const deliveryData = [
    {
      value: 1000,
      label: 'Выезд: 1 000₽'
    }
  ]
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const productsStore =  ProductCard

  useEffect(() => {
    const productsLocalStorage =localStorage.getItem('card');
    if(productsLocalStorage !== null){
      productsStore.setProductsCard(JSON.parse(productsLocalStorage));
    }
    if(productsLocalStorage == null || JSON.parse(productsLocalStorage).length === 0) {
      router.push('/');
    }
  }, []);

  const formik = useFormik<FormFields>({
      validateOnBlur: false,
      validateOnChange: false,
    initialValues: {
      firstName: '',
      phone: '',
      address: '',
      description: '',
      delivery: 1000,
      directionImage: ''
    },

    onSubmit: async (values) => {

      const formData = {
        address: values.address,
        first_name: values.firstName,
        description: values.description,
        phone: values.phone,
        delivery: values.delivery,
        direction_image: values.directionImage,
        products: productsStore.getOrderProducts()
      }
      setIsRequesting(true);

      const response = await FeedbackService.createFeedBack(formData).finally(() => {
        setIsRequesting(false)
      });
      console.log(response)
      if( response.status === 201){
        setIsSucces(true)
        formik.resetForm();
        productsStore.setProductsCard([]);
        productsStore.updateLocalStorageProductsCard();
      }else {
        alert('При отправке запроса возникла ошибка!')
      }
    },
  });


  const loadingStyles = clsx(styles.loading,{
    [styles.visible]: isSucces,
  })

  return (
    <div className={styles.wrapper}>
      <h2>Оформление заказа</h2>
      {isSucces ?
        <div className={styles.formWrapper}>
          <div className={styles.centerWrapper}>
            <h2 className={styles.subTitle}>Спасибо за заказ!</h2>
            <p>В течение пяти минут наш менеджер свяжется с вами по телефону, для подтверждения заказа.</p>
            <Button onClick={() => router.push('/')}> <IcHome/> Вернуться на главную </Button>
          </div>
        </div>
        :
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.flexWrapper}>
            <div className={styles.block}>
              <div className={styles.formWrapper}>
                <h3>Ваши данные</h3>
                <TextField
                  theme={'blue'}
                  name='firstName'
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  placeholder='Имя'
                />
                <TextField
                  theme={'blue'}
                  name='phone'
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder='Телефон'
                />
                <TextField
                  theme={'blue'}
                  name='address'
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  placeholder='Адрес'
                />
                <TextField
                  theme={'blue'}
                  name='description'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder='Описание проблемы'
                />

                <SingleFileUpload
                  theme={'blue'}
                  label={'Загрузить фото направления'}
                  onChange={(file: string) => {
                    formik.setFieldValue('directionImage', file);
                    console.log(file)
                  }}
                  wrapperClassname={styles.field}
                  isReset={false}
                />
              </div>
              {/*<div className={styles.formWrapper}>*/}
              {/*  <h3>Доставка</h3>*/}
              {/*  <Select placeholder={'Доставка'} options={deliveryData}*/}
              {/*          value={deliveryData.find((option) => option.value === formik.values.delivery)}*/}
              {/*          onChange={(option) =>*/}
              {/*            formik.setFieldValue('delivery', option?.value)*/}
              {/*          }/>*/}
              {/*</div>*/}
              <div className={styles.formWrapper}>
                <h3>Ваш заказ</h3>
                {productsStore.productsCard.map((product)=><ProductItem product={product}/>)}
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.formWrapper}>
                <h3>Ваш заказ</h3>
                <div>
                  <div className={styles.textLine}><p>Услуги({productsStore.count})</p> <span>{productsStore.sum} ₽</span></div>
                  <div className={styles.textLine}><p>Доставка</p> <span>{formik.values.delivery} ₽</span></div>
                </div>
                <div className={styles.finish}>
                  <div className={styles.textLine}><h3>Итого</h3> <h3>{productsStore.sum + formik.values.delivery} ₽</h3>
                  </div>
                  <Button style={{marginTop: '10px'}} theme={'filled'} type='submit' className={styles.btn}>
                    Отправить
                  </Button>
                  <p className={styles.bottomText}>
                    Нажимая на кнопку, вы соглашаетесь с <a href="">Условиями обработки персональных данных</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </div>


  );
});

export default Form;