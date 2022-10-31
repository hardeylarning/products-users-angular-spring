import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, Product2 } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = '/api/products'

  private message!: string 

  constructor(private http: HttpClient) { }

  setMessage(message: string) {
    this.message = message
  }

  getMessage() {
    return this.message
  }

  getProduct(id: number) {
    return this.http.get<Product>(this.BASE_URL+'/'+id)
  }

  getProducts() {
    return this.http.get<Product[]>(this.BASE_URL)
  }

  addProduct(product: Product2) {
    return this.http.post<any>(this.BASE_URL, product)
  }

  updateProduct(id:number, product: Product) {
    return this.http.put<any>(this.BASE_URL+'/'+id, product)
  }

  deleteProducts(ids:number[]) {
    return this.http.delete<any>(this.BASE_URL+'/'+ids)
  }
}
