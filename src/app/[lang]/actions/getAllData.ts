import {Category, ProductsResponse, TCityRead, TCountry} from "@/types/types";

export function getAllProducts({lang}:{lang: string}): Promise<ProductsResponse>{
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?localization=${lang}`, { next: {revalidate:60}}).then(res => res.json());
}

export function getAllCategory({lang}:{lang: string}): Promise<Category[]>{
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?localization=${lang}`, { next: {revalidate:60}}).then(res => res.json());
}

export async function getAllCity() {

  const countries:TCountry[] = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries/`, { next: {revalidate:60}}).then((res) => res.json());

  const cities = countries.map((country) => {
    let currency = country.currency
    return country.cities.map((city)=>(city.localization))
  })

  return cities.flat();
}

export async function getAllCitiesRead() {

  const countries:TCountry[] = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries/`, { next: {revalidate:60}}).then((res) => res.json());

  const cities = countries.map((country) => {
    let currency = country.currency
    return country.cities.map((city)=>({value:{locale: city.localization, name: city.name}, label: city.name, currency: currency}));
  })

  return cities.flat();
}

export async function getAllCityByCountry({locale}:{locale: string}) {

  const countries:TCountry[] = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries/`, { next: {revalidate:60}}).then((res) => res.json());

  const countriesNew = countries.map((country) => {
    let currency = country.currency
    if(country.name === "Россия"){
      return {...country, localization: 'ru'}
    }else{
      return {...country, localization: 'kz'}
    }
  })

  const findCountry = countriesNew.find((country) => {
    if(country.localization === locale){
      return country
    }
  });

  return findCountry?.cities.flatMap((city) => {
    return city.localization
  });
}

export async function getDefaultCityByCountry({locale}:{locale: string}) {

  const countries:TCountry[] = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/countries/`, { next: {revalidate:60}}).then((res) => res.json());

  const countriesNew = countries.map((country) => {
    let currency = country.currency
    if(country.name === "Россия"){
      return {...country, localization: 'ru'}
    }else{
      return {...country, localization: 'kz'}
    }
  })

  const findCountry = countriesNew.find((country) => {
    if(country.localization === locale){
      return country
    }
  });

  return findCountry?.default_city.localization
}