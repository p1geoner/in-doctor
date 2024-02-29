import {Category, ProductsResponse} from "@/types/types";

export function getAllProducts(): Promise<ProductsResponse>{
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, { next: {revalidate:60}}).then(res => res.json());
}

export function getAllCategory(): Promise<Category[]>{
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`, { next: {revalidate:60}}).then(res => res.json());
}