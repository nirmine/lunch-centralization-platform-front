import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SigninUserComponent } from './signin-user/signin-user.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { AddDishFormComponent } from './add-dish-form/add-dish-form.component';
import { AddDishListComponent } from './add-dish-list/add-dish-list.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ListRestaurantComponent } from './list-restaurant/list-restaurant.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DashboardProxymianComponent } from './dashboard-proxymian/dashboard-proxymian.component';
import { ProfilRestaurantComponent } from './profil-restaurant/profil-restaurant.component';
import { EditRestauInfosComponent } from './edit-restau-infos/edit-restau-infos.component';
import { MenuProxymianComponent } from './menu-proxymian/menu-proxymian.component';
import { ValidateOrderProxymianComponent } from './validate-order-proxymian/validate-order-proxymian.component';
import { GiveFeedbackProxymianComponent } from './give-feedback-proxymian/give-feedback-proxymian.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AddRestaurantAdminComponent } from './add-restaurant-admin/add-restaurant-admin.component';
import { AddAdminSuperComponent } from './add-admin-super/add-admin-super.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';
import { SigninRestauComponent } from './signin-restau/signin-restau.component';
import { DashboardRestauComponent } from './dashboard-restau/dashboard-restau.component';
import { DashboardSuperComponent } from './dashboard-super/dashboard-super.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SigninUserComponent,
    AddDishComponent,
    AddDishFormComponent,
    AddDishListComponent,
    ListRestaurantComponent,
    DashboardProxymianComponent,
    ProfilRestaurantComponent,
    EditRestauInfosComponent,
    MenuProxymianComponent,
    ValidateOrderProxymianComponent,
    GiveFeedbackProxymianComponent,
    DashboardAdminComponent,
    AddRestaurantAdminComponent,
    AddAdminSuperComponent,
    SigninAdminComponent,
    SigninRestauComponent,
    DashboardRestauComponent,
    DashboardSuperComponent,
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireStorageModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
