import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { SuperAdminService } from '../services/super-admin.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private restauService:RestaurantService,private superAdminService: SuperAdminService,private router : Router, private route: ActivatedRoute) 
  {
    this.restauId=sessionStorage.getItem('restauId')
this.superAdminService.getAllUsers().snapshotChanges().subscribe(res=>{
  this.users=[]
res.forEach(element => {
  let ens={}
  //console.log(element.key):idUser
  ens['id']=element.key
  ens['name']=element.payload.val()['name']
  ens['phone']=element.payload.val()['phone']
  ens['email']=element.payload.val()['email']
  //ens['role']=element.payload.val()['role']
 
  this.users.push(ens)
  console.log(  this.users)
});

})


   }
   restauId:any
  users:any=[];
  ngOnInit(): void {
  }

  volunteerForDelivery(userName:any)
  {
  this.restauService.setDelivery(this.restauId,userName)
  this.router.navigate(['dashboard-admin'])
  }
}
