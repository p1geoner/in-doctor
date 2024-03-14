"use client"
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';

import styles from './Form.module.scss';
import FeedbackService from "@/API/FeedbackService";
import {Button, TextField} from "@/components/UI-Kit";
import SingleFileUpload from "./OrderForm/SingleFileUpload/SingleFileUpload";
import clsx from "clsx";

export type FormFields = {
  address: string,
  firstName: string,
  phone: string,
  description: string,
  delivery: string,
  directionImage: ''
};

const Form = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const formik = useFormik<FormFields>({
      validateOnBlur: false,
      validateOnChange: false,
    initialValues: {
      address: '',
      firstName: '',
      phone: '',
      description: '',
      delivery: '',
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
      }

      setIsRequesting(true);

      const response = await FeedbackService.createFeedBack(formData).finally(() => {
        setIsRequesting(false)
        setIsSucces(true)
        formik.resetForm();
      });
      console.log(response)
      if( response.status === 201){
        setIsSucces(true)
        formik.resetForm();
      }
    },
  });


  const loadingStyles = clsx(styles.loading,{
    [styles.visible]: isSucces,
  })

  return (
        <form className={styles.formWrapper} onSubmit={formik.handleSubmit}>
          <TextField
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            placeholder='Имя'
          />
          <TextField
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder='Телефон'
          />
          <TextField
            name='address'
            value={formik.values.address}
            onChange={formik.handleChange}
            placeholder='Адрес'
          />
          <TextField
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            placeholder='Описание проблемы'
          />
          <SingleFileUpload
            label={'Загрузить фото направления'}
            onChange={(file: string) => {
              formik.setFieldValue('directionImage', file);
            }}
            wrapperClassname={styles.field}
            isReset={false}
          />

          <Button theme='white' type='submit' className={styles.btn}>
            Отправить
          </Button>
          <p className={styles.alert}>Нажимая на кнопку, вы соглашаетесь с <a href="/политика_конфиденциальности.docx">Условиями обработки персональных данных</a></p>
          <div className={loadingStyles}><h3>Спасибо за заказ!</h3> <p>Наш менеджер перезвонит вам в течение пяти минут для подтверждения  заказа.</p></div>
        </form>
  );
};

export default Form;