import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ProductsComponent } from './components/product/products/products.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UsersComponent } from './components/user/users/users.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './directive/email-validator.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CheckerComponent } from './components/checker/checker.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    EditUserComponent,
    UsersComponent,
    AddUserComponent,
    LoginComponent,
    ErrorPageComponent,
    EmailValidatorDirective,
    NavbarComponent,
    CheckerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
