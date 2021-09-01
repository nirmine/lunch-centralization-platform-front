import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-restaus-list',
  templateUrl: './restaus-list.component.html',
  styleUrls: ['./restaus-list.component.css']
})
export class RestausListComponent implements OnInit {

  constructor(private resService:RestaurantService,private router : Router, private route: ActivatedRoute) { 

      let ens={}
    this.resService.getRestauList().snapshotChanges().subscribe(
    res=>{
      this.restausList=[]
      res.forEach(element => {
        ens={}
        console.log(element.payload.val()['id'])
        ens['id']=element.payload.val()['id']
        let decrypted = CryptoJS.AES.decrypt(element.payload.val()['password'],'secret key 123');
        let originalText = decrypted.toString(CryptoJS.enc.Utf8);
        ens['password']=originalText
        ens['name']=element.payload.val()['name']
        ens['email']=element.payload.val()['email']
        ens['phoneNumber']=element.payload.val()['phoneNumber']
        ens['address']=element.payload.val()['address']
        ens['del']=element.payload.val()['delivery']
        this.resService.getRestauImageSrc(element.payload.val()['id'],ens)
        this.restausList.push(ens)
        console.log(element.payload.val())
      });
      
    })
    
   
  }

  restausList=[];
  ngOnInit(): void {
    
  }

  deleteRestau(idRestau:any)
  {
    this.resService.deleteRestau(idRestau);
  }
  editRestauProfil(idRestau:any)
  {
    sessionStorage.setItem('restauid',idRestau)
    this.router.navigate(['editprofilRestau'])
  }
}
