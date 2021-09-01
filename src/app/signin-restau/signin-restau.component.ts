import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-signin-restau',
  templateUrl: './signin-restau.component.html',
  styleUrls: ['./signin-restau.component.css']
})
export class SigninRestauComponent implements OnInit {

  constructor(private router : Router, private route: ActivatedRoute,private restauService:RestaurantService) 
  {
    console.log( sessionStorage.getItem('isConnected'))
   }
  erreur = true;
  user:any={};
  restauName="";
  restauAddress:any;
  //userPwd:any;
  //userRole:any;
  ngOnInit(): void {
  }
  checkLogin(form) {
    // console.log(form.value)
     //this.getInfosUser(form);
     this.isAuthenticated(form)
     
   }
 
   isAuthenticated(form) {
     //console.log(form.value.password)  //this.userPwd)
 
     
     this.restauService.getInfoRestaurantById(form.value.id).snapshotChanges().subscribe(infos => {
       //console.log(infos[0].payload.val()['name'])
        //ens.push(infos[0].payload.val()['name'])
        //console.log(infos.length)
        if(infos.length==0)
        {
         console.log("user inexistant")
         this.erreur = false;
        }
        
        else{
          
       
         this.restauName=infos[0].payload.val()['name']
         //this.userPwd=infos[0].payload.val()['password']
         // this.restauEntry=infos[0].payload.val()['entry']
          this.restauAddress=infos[0].payload.val()['address']
          let decrypted = CryptoJS.AES.decrypt(infos[0].payload.val()['password'],'secret key 123');
          let originalText = decrypted.toString(CryptoJS.enc.Utf8);
         if (form.value.password ==  originalText )//if (this.user.password === this.userPwd)
         {
           sessionStorage.setItem('isConnected', 'true');
          //console.log('connected')
          sessionStorage.setItem('restauName', infos[0].payload.val()['name']);
          sessionStorage.setItem('role', 'restau');
          sessionStorage.setItem('userId', this.user.id);
         
          console.log(this.restauAddress)
          if(this.restauAddress==undefined)
          {
            this.router.navigate(['editprofilRestau']);
             
            //console.log(this.restauEntry)
          } 
          else
          this.router.navigate(['dashboard-restau']);
          
        
        } else 
          {
          this.erreur = false;
          }
 
 
 
        }
         
          }, (error) => {
            console.log(error);
          });
 
 
 
  
     }
     
   
}
