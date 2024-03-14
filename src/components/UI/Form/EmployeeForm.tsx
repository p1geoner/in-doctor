"use client"
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';

import styles from './Form.module.scss';
import FeedbackService from "@/API/FeedbackService";
import {Button, Checkbox, TextField} from "@/components/UI-Kit";
import SingleFileUpload from "@/components/UI-Kit/SingleFileUpload/SingleFileUpload";
import clsx from "clsx";

export type FormFields = {
  address: string,
  firstName: string,
  phone: string,
  email: string,
  promoCode: string,
  city: string,
  certificate: File | null,
  photoWithPassport: File | null,
  affiliateProgram: boolean
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
      email: '',
      promoCode: '',
      city: '',
      certificate: null,
      photoWithPassport: null,
      affiliateProgram: false
    },

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('address', values.address);
      formData.append('first_name', values.firstName);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('city', values.city);
      formData.append('promo_code', values.promoCode);
      if(values.affiliateProgram){
        formData.append('affiliate_program', 'true')
      }

      if (values.certificate !== null) {
        formData.append('certificate', values.certificate);
      }
      if (values.photoWithPassport !== null) {
        formData.append('photo_with_passport', values.photoWithPassport);
      }

      setIsRequesting(true);

      const response = await FeedbackService.createFeedBackEmployee(formData).finally(() => {
        setIsRequesting(false)
        setIsSucces(true)
        formik.resetForm();
      });
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
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        placeholder='Почта'
      />
      <TextField
        name='city'
        value={formik.values.city}
        onChange={formik.handleChange}
        placeholder='Город работы'
      />
      <TextField
        name='promoCode'
        value={formik.values.promoCode}
        onChange={formik.handleChange}
        placeholder='Промокод (если есть)'
      />
      <div className={styles.group}>
        <SingleFileUpload
        label={'Загрузить сертификат медсестры'}
        onChange={(file: File | null) => {
        formik.setFieldValue('certificate', file);
      }}
        wrapperClassname={styles.field}
        isReset={false}
        />
        <SingleFileUpload
          label={'Загрузить селфи с паспортом'}
          onChange={(file: File | null) => {
            formik.setFieldValue('photoWithPassport', file);
          }}
          wrapperClassname={styles.field}
          isReset={false}
        />
        <Checkbox checked={formik.values.affiliateProgram} onChange={(e)=> formik.setFieldValue('affiliateProgram',e.target.checked)} >Хочу учавствовать в акции <a href="">“Партнерская программа”</a></Checkbox>
      </div>
      <Button theme='white' type='submit' className={styles.btn}>
        Отправить
      </Button>
      <p className={styles.alert}>Нажимая на кнопку, вы соглашаетесь с <a href="/политика_конфиденциальности.docx">Условиями обработки персональных данных</a></p>
      <div className={loadingStyles}><h3>Спасибо за заявку!</h3> <p>Наш консультант перезвонит вам в течение пяти минут.</p></div>
    </form>
  );
};

export default Form;