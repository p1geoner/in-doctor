import makeRequest from '@/API/makeRequest';
import {ProductsResponse} from "@/types/types";
import {AxiosResponse} from "axios";

class ProductService {
  getProduct(data:string) {
    return makeRequest<void>({
      url: `api/products/${data}`,
      method: 'get',
    });
  }
}

export default new ProductService();