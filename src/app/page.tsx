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
import {getAllCategory, getAllProducts} from "@/app/actions/getAllData";
import ProductList from "@/components/ProductList/ProductList";

const meta = {
  title: 'title',
  description: 'description'
}

export default async function Home() {

  const products = await getAllProducts();
  const categories = await getAllCategory();
  return (
    <>
      <Intro title={'Вызов медсестры на дом '}
             subTitle={'Сервис подбора сертифицированных медсестер с вызовом на дом'}/>
      <PageWrapper mainStyles={'main'} meta={meta}>
        <div className={'innerWrapper'}>
          {/*{products.results.map((product)=>{
            return(<div>{product.title}</div>)
          })}*/}
          <ProductList categoriesList={categories} productsList={products}></ProductList>
          <ClientForm></ClientForm>
          <Advantages></Advantages>
          <SwiperImg></SwiperImg>
          <Partners></Partners>
          <Questions></Questions>
          <Feedback></Feedback>
          <EmployeeForm></EmployeeForm>
        </div>
        {/*<Button theme={'filled'}>Оставить заявку</Button>*/}
        {/*   <Checkbox> Хочу учавствовать в акции <a href="">“Партнерская программа”</a></Checkbox>*/}

      </PageWrapper>
      {/*<TextField theme={'blue'} placeholder={'dsadasdas'}></TextField>*/}

    </>
  );
}
