export interface ProductsResponse {
  count: number
  next: string
  previous: string
  results: Product[]
}

export interface Product {
  id: number
  title: string
  image: string
  price: number
  discount_price: number
  category: Category[]
}

export interface ProductCard {
  id: number
  price: number
  discount_price: number
  amount: number
  image: string
  title: string
}
export interface Category {
  id: number
  title: string
}


export type TCity = {
  id: number;
  name: string;
  localization: string
}
export type TCityRead = {
  id: number;
  name: string;
  localization: string;
  currency: string;
}

export type TCountry = {
  id: number;
  name: string;
  currency: string;
  cities: TCity[];
  default_city: TCity;
}
