import styles from "./page.module.css";
import {Button, Checkbox, TextField} from "@/components/UI-Kit";
import Questions from "@/components/UI/Questions/Questions";
import PageWrapper from "@/components/UI-Kit/PageWrapper/PageWrapper";
import SwiperImg from "@/components/UI/SwiperImages/SwiperImg";
import Feedback from "@/components/UI/Feedback/Feedback";
import Partners from "@/components/UI/Partners/Partners";
import Advantages from "@/components/UI/Advantages/Advantages";
import Intro from "@/components/UI/Intro/Intro";
import SingleFileUpload from "@/components/UI-Kit/SingleFileUpload/SingleFileUpload";
import ClientForm from "@/components/UI/ClientFormPage/ClientFormPage";
import EmployeeForm from "@/components/UI/EmployeeFormPage/EmployeeFormPage";
import {getAllCategory, getAllCity, getAllCityByCountry, getAllProducts} from "@/app/[lang]/actions/getAllData";
import ProductList from "@/components/ProductList/ProductList";
import Head from "next/head";
import {Metadata} from "next";
import {i18n} from "../../../i18n.config";
import Link from "next/link";
import {TCityRead, TCountry} from "@/types/types";

export const metadata: Metadata = {
  title: 'Медицинские услуги на дому 24/7 - Сервис «Наш доктор»',
  description: 'Предлагаем индивидуальный подход и удобство медицинских услуг на дому для всех пациентов. Гибкое расписание, профессиональная помощь в городе и сельской местности. Безопасный и удобный выбор для пожилых людей и инвалидов. Медсестра на дом в Вашем городе, вызов медсестер на дом для оказания медицинских услуг. Проверенные сертифицированные медсестры. Вызвать медсестру на дом для оказания платных медуслуг. Сервис «Наш доктор» делает здоровье доступным для вас.',
  keywords: 'к Врачу, Анализ, Уколы, Капельница, капельница +на дом, капельница +от запоя, прокапаться, Медсестра +на дом, анализы +на дому, сиделка, Медсестра на дом'
}



export async function generateStaticParams() {

  const countries:TCountry[] = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries/`, { next: {revalidate:60}}).then((res) => res.json());

  const cities = countries.map((country) => {
    let currency = country.currency
    return country.cities.map((city)=>({
      currency: currency,
      ...city
    }))
  })

  return cities.flat().map((city: TCityRead ) => ({
    lang: city.localization,
  }))
}

export default async function Home({params: { lang }}: { params: { lang: string } }) {

  const products = await getAllProducts({lang});
  const categories = await getAllCategory({lang});
  const cities = await getAllCity();
  const countries = await getAllCityByCountry({locale: 'ru'})
  console.log(countries);
  return (
    <>
      <Intro title={'Вызов медсестры на дом '}
             subTitle={'Сервис подбора сертифицированных медсестер с вызовом на дом'}/>
      <PageWrapper mainStyles={'main'}>
        <div className={'innerWrapper'}>
          {cities.includes(lang) ? <ProductList categoriesList={categories} productsList={products}></ProductList> : <>{lang}</>}
          <ClientForm></ClientForm>
          <Advantages></Advantages>
          <SwiperImg></SwiperImg>
          <Partners></Partners>
          <Questions></Questions>
          <Feedback></Feedback>
          <EmployeeForm></EmployeeForm>
        </div>
      </PageWrapper>
    </>
  );
}
