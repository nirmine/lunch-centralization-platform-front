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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
