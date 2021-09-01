import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-signin-user',
  templateUrl: './signin-user.component.html',
  styleUrls: ['./signin-user.component.css']
})
export class SigninUserComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute,private restauService:RestaurantService) 
  {
    console.log( sessionStorage.getItem('isConnected'))
   }

  ngOnInit(): void {
  }
  erreur = true;
  user:any={};
  userName="";
  userPwd:any;
  userRole:any;
  onSubmitt()
  {
    sessionStorage.setItem('userId',this.user.id);
    this.router.navigate(['addNewDish']);
    
  }
  checkLogin(form) {
   // console.log(form.value)
    //this.getInfosUser(form);
    this.isAuthenticated(form)
    
  }

  isAuthenticated(form) {
    //console.log(form.value.password)  //this.userPwd)

    
    this.restauService.getInfoUserById(form.value.id).snapshotChanges().subscribe(infos => {
      //console.log(infos[0].payload.val()['name'])
       //ens.push(infos[0].payload.val()['name'])
       //console.log(infos.length)
       if(infos.length==0)
       {
        console.log("user inexistant")
        this.erreur = false;
       }
       
       else{
         
      this.userRole=infos[0].payload.val()['role']
        this.userName=infos[0].payload.val()['name']
        this.userPwd=infos[0].payload.val()['password']

        if (form.value.password == infos[0].payload.val()['password'])//if (this.user.password === this.userPwd)
        {
          sessionStorage.setItem('isConnected', 'true');
         console.log('connected')
         
         sessionStorage.setItem('role','normal');
         sessionStorage.setItem('userId', this.user.id);
         sessionStorage.setItem('name', infos[0].payload.val()['name']);
         this.router.navigate(['dashboard']);
         } else 
         {
         this.erreur = false;
         }



       }
        
         }, (error) => {
           console.log(error);
         });



  /* if(this.userPwd=="")
    {
      this.erreur = false;
      console.log(form.value.password)
    }
    
    else
    {
   
  }*/
    }
    
  test()
  {
    
  }
}
