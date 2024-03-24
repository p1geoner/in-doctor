import { action, makeObservable, observable } from 'mobx';
import {ProductCard} from "@/types/types";

class ProductStore {
  count = 0;
  lastPage = 1;
  amount = 0;
  sum= 0;
  productsCard: ProductCard[] = [];
  constructor() {
    makeObservable(this, {
      count: observable,
      sum: observable,
      productsCard: observable,
      setCount: action,
      setSum: action,
      setProductsCard: action,
      updateLocalStorageProductsCard: action,
      updateCount: action,
      getOrderProducts: action,
    });
  }
  setCount(newCount: number) {
    this.count = newCount;
  }
  setSum(newSum: number) {
    this.sum = newSum;
  }
  updateCount() {
    const productsAmount =this.productsCard.map((product)=>{
      return   product.amount
    });
    this.count = productsAmount.reduce((totalCount, amount) => totalCount + amount, 0);
  }

  setProductsCard(products: ProductCard[]) {
    this.productsCard = products
    this.updateLocalStorageProductsCard();
    this.updateCount();
  }

  updateLocalStorageProductsCard() {
    localStorage.setItem('card',JSON.stringify(this.productsCard));
  }

  getOrderProducts() {
    return this.productsCard.map((product) => ({id: product.id, amount: product.amount}))
  }

}
export default new ProductStore();