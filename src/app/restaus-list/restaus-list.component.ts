import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

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
        ens['password']=element.payload.val()['password']
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
}
