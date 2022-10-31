import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  id: any;
  form!: FormGroup;
  product!: Product;

  code = '';
  name = '';
  tag = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
  
    this.route.params.subscribe((res) => {
      this.id = res['id'];
      this.productService.getProduct(this.id).subscribe((data) => {
        this.product = data;
        this.code = data.code;
        this.name = data.name;
        this.tag = data.tag;
        this.form = this.fb.group({
          code: new FormControl(this.code),
          name: new FormControl(this.name),
          tag: new FormControl(this.tag),
        });
      });
    });
  }

  onSubmit() {
    this.product.code = this.form.value.code;
    this.product.name = this.form.value.name;
    this.product.tag = this.form.value.tag;
    this.productService.updateProduct(this.id, this.product).subscribe((res) => {
      this.productService.setMessage(res.message);
      this.router.navigateByUrl('/products');
    });
  }

}
