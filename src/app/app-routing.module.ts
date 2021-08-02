import { UsersListComponent } from './users-list/users-list.component';
import { FeedbacksListComponent } from './feedbacks-list/feedbacks-list.component';
import { RestausListComponent } from './restaus-list/restaus-list.component';
import { DashboardSuperComponent } from './dashboard-super/dashboard-super.component';
import { DashboardRestauComponent } from './dashboard-restau/dashboard-restau.component';
import { AuthGuard } from './services/auth.guard';
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
import { SigninRestauComponent } from './signin-restau/signin-restau.component';
import { SigninAdminComponent } from './signin-admin/signin-admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'signInUser', component: SigninUserComponent },
  { path: 'addNewDish', component: AddDishComponent,canActivate:[AuthGuard] },
  { path: 'dashboard', component: DashboardProxymianComponent,canActivate:[AuthGuard] },
   { path: 'RestauMenu', component: MenuProxymianComponent,canActivate:[AuthGuard] },
   { path: 'editprofilRestau', component: EditRestauInfosComponent ,canActivate:[AuthGuard]},
   { path: 'validateOrder', component: ValidateOrderProxymianComponent,canActivate:[AuthGuard]},
   { path: 'feedback', component: GiveFeedbackProxymianComponent,canActivate:[AuthGuard]},
   { path: 'dashboard-admin', component: DashboardAdminComponent,canActivate:[AuthGuard]},
   { path: 'addRestaurant-admin', component: AddRestaurantAdminComponent,canActivate:[AuthGuard]},
   { path: 'addNewAdmin', component: AddAdminSuperComponent ,canActivate:[AuthGuard]},
   { path: 'signInRestau', component: SigninRestauComponent },
   { path: 'signInAdmin', component: SigninAdminComponent },
   { path: 'dashboard-restau', component: DashboardRestauComponent,canActivate:[AuthGuard]},
   { path: 'dashboard-super', component: DashboardSuperComponent,canActivate:[AuthGuard]},
   { path: 'restaus-list', component: RestausListComponent,canActivate:[AuthGuard]},
   { path: 'feeds-list', component: FeedbacksListComponent,canActivate:[AuthGuard]},
   { path: 'users-list', component: UsersListComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
