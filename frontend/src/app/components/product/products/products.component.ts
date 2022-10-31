import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product/product.service';

import * as $ from 'jquery'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  subscription!: Subscription;
  form: FormGroup;

  products: Product[] = [];
  message: string = '';
  checkArray!: FormArray;
  ids: number[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.form = fb.group({
      ids: fb.array([]),
    });
  }

  ngOnInit(): void {
    this.message = this.productService.getMessage();
    this.productService.setMessage('');
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  protected delete() {
    if (this.checkArray == undefined) {
      this.productService.setMessage('Nothing was selected!')
      this.ngOnInit();
      return;
    }
    this.ids = this.checkArray['value'];
    if (this.ids.length <= 0) {
      this.productService.setMessage('Nothing was selected!')
      this.ngOnInit();
      return;
    }
    if (this.checkArray && this.ids.length > 0) {
       this.productService.deleteProducts(this.ids).subscribe((data) => {
        this.productService.setMessage('Product(s) deleted successfully!')
        window.location.reload()
        this.ngOnInit(); 
      });
    }
  }

  protected checker = (event: any) => {
    $('#checkAll').click(function () {    
      $('input:checkbox').prop('checked', event.target.checked);  
    });
    this.checkArray = this.form.get('ids') as FormArray;
    if (event.target.checked == true) {
      for (const product of this.products) {
        this.checkArray.push(new FormControl(product.id.toString()));
      }
    }
    else {
      this.checkArray.clear()
    }
  }
 
  onCheckBoxChange(e: any) {
    this.checkArray = this.form.get('ids') as FormArray;
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: any) => {
        if (item.value === e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


}


