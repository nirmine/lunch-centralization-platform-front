import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {

  isConnected:any;
  userConnectedRole:any="";
  restauName:any="";
  isLogIn=false;
  constructor(private router : Router, private route: ActivatedRoute) { 
    this.isConnected=sessionStorage.getItem('isConnected')
    this.userConnectedRole=sessionStorage.getItem('role')
    this.restauName=sessionStorage.getItem('restauName')
    this.router.url
  }

  ngOnInit(): void {
    //window.location.reload();
  
  }

  ngDoCheck()
  {

    this.isConnected=sessionStorage.getItem('isConnected')
    this.userConnectedRole=sessionStorage.getItem('role')
    this.restauName=sessionStorage.getItem('restauName')
    console.log(this.userConnectedRole)
  }
  signout()
  {
    
    sessionStorage.setItem('isConnected','false');
    console.log(sessionStorage.getItem('isConnected'))
    sessionStorage.setItem('userId',null);
    sessionStorage.setItem('name', null);
    this.router.navigate(['home']);
  }
  signIn()
  {

    this.router.navigate(['signInUser']);
  }
  showDash()
  {
    switch(this.userConnectedRole)
    {
      case 'admin':  this.router.navigate(['dashboard-admin']); break;
      case 'normal':  this.router.navigate(['dashboard']); break;
      case 'restau':  this.router.navigate(['dashboard-restau']); break;
      case 'super':  this.router.navigate(['dashboard-admin']); break;
      
      default:
        this.router.navigate(['home']);
        break;
    }
  }
}
