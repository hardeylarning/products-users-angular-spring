import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckerComponent } from './components/checker/checker.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { ProductsComponent } from './components/product/products/products.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { UsersComponent } from './components/user/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'add-user', component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-user/:id', component: EditUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products', component: ProductsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-product', component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-product/:id', component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'check', component: CheckerComponent,
  },
  {
    path: '', redirectTo: '/users', pathMatch: 'full'
  },
  {
    path: '**', component: ErrorPageComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
