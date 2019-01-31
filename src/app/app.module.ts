import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { environment } from 'src/environments/environment';
import { ProductsComponent } from './products/products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { DbService } from './services/db.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingCartComponent,
    ProductsComponent,
    CheckOutComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    OrderSuccessComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { 
        path: '',
        component: HomeComponent 
      },
      { 
        path: 'login',
        component: LoginComponent
      },
      { 
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard] 
      },
      { 
        path: 'shopping-cart', 
        component: ShoppingCartComponent
      },

      { 
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthGuard]  
      },
      { 
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [AuthGuard]  
      },
      { 
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard] 
      },
      { 
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard, AdminAuthGuard]  
      },
      { 
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: '**',
        component: HomeComponent 
      },
    ])
  ],
  providers: [AuthService,
    DbService, 
    AuthGuard, 
    AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
