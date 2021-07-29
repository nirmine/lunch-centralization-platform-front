import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean
    {
      console.log((sessionStorage.getItem('isConnected')))
      
      if(sessionStorage.getItem('isConnected')=='true')
      {
       
        return true;
      }

   else {
    // if(localStorage.getItem('isConnected')=='false')
     //{
       this.router.navigateByUrl('/signInUser');
     return false;
    // }
    }
     
 }
  
}
