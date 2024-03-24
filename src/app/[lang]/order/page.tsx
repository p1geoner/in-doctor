"use client"
import Questions from "@/components/UI/Questions/Questions";
import PageWrapper from "@/components/UI-Kit/PageWrapper/PageWrapper";
import SwiperImg from "@/components/UI/SwiperImages/SwiperImg";
import Feedback from "@/components/UI/Feedback/Feedback";
import Partners from "@/components/UI/Partners/Partners";
import Advantages from "@/components/UI/Advantages/Advantages";
import Intro from "@/components/UI/Intro/Intro";
import ClientForm from "@/components/UI/ClientFormPage/ClientFormPage";
import EmployeeForm from "@/components/UI/EmployeeFormPage/EmployeeFormPage";
import {getAllCategory, getAllProducts} from "@/app/[lang]/actions/getAllData";
import ProductList from "@/components/ProductList/ProductList";
import OrderForm from "@/components/UI/Form/OrderForm/OrderForm";
import Head from "next/head";

const meta = {
  title: 'title',
  description: 'description'
}
export default function Home() {

  return (
    <>
      <Head>
        <title>Медицинские услуги на дому 24/7 - Сервис «Наш доктор»</title>
      </Head>
      <PageWrapper mainStyles={'main'} meta={meta}>
        <div className={'innerWrapper'}>
            <OrderForm></OrderForm>
        </div>
      </PageWrapper>
    </>
  );
}
