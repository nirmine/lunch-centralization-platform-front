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
