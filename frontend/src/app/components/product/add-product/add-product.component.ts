import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, Product2 } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  code = ''
  tag = ''
  name = ''

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
   let product = new Product2(this.code, this.name, this.tag)
    this.productService.addProduct(product).subscribe(data => {
      this.productService.setMessage(data.message)
      this.router.navigateByUrl('/products')
    })
  }

}
