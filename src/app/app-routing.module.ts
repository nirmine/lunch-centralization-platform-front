import { EditRestauInfosComponent } from './edit-restau-infos/edit-restau-infos.component';
import { ProfilRestaurantComponent } from './profil-restaurant/profil-restaurant.component';
import { DashboardProxymianComponent } from './dashboard-proxymian/dashboard-proxymian.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { SigninUserComponent } from './signin-user/signin-user.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'signInUser', component: SigninUserComponent },
  { path: 'addNewDish', component: AddDishComponent },
  { path: 'dashboard', component: DashboardProxymianComponent },
   { path: 'profilRestau', component: ProfilRestaurantComponent },
   { path: 'editprofilRestau', component: EditRestauInfosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
