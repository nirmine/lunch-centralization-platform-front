import { AddRestaurantAdminComponent } from './add-restaurant-admin/add-restaurant-admin.component';
import { GiveFeedbackProxymianComponent } from './give-feedback-proxymian/give-feedback-proxymian.component';
import { ValidateOrderProxymianComponent } from './validate-order-proxymian/validate-order-proxymian.component';
import { MenuProxymianComponent } from './menu-proxymian/menu-proxymian.component';
import { EditRestauInfosComponent } from './edit-restau-infos/edit-restau-infos.component';
import { ProfilRestaurantComponent } from './profil-restaurant/profil-restaurant.component';
import { DashboardProxymianComponent } from './dashboard-proxymian/dashboard-proxymian.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { SigninUserComponent } from './signin-user/signin-user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AddAdminSuperComponent } from './add-admin-super/add-admin-super.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'signInUser', component: SigninUserComponent },
  { path: 'addNewDish', component: AddDishComponent },
  { path: 'dashboard', component: DashboardProxymianComponent },
   { path: 'RestauMenu', component: MenuProxymianComponent },
   { path: 'editprofilRestau', component: EditRestauInfosComponent },
   { path: 'validateOrder', component: ValidateOrderProxymianComponent},
   { path: 'feedback', component: GiveFeedbackProxymianComponent},
   { path: 'dashboard-admin', component: DashboardAdminComponent},
   { path: 'addRestaurant-admin', component: AddRestaurantAdminComponent},
   { path: 'addNewAdmin', component: AddAdminSuperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
