import { SuperAdminService } from './../services/super-admin.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../models/admin';

@Component({
  selector: 'app-add-admin-super',
  templateUrl: './add-admin-super.component.html',
  styleUrls: ['./add-admin-super.component.css']
})
export class AddAdminSuperComponent implements OnInit {


  constructor(private superAdminService: SuperAdminService,private router : Router, private route: ActivatedRoute) 
  {
this.superAdminService.getAllUsers().snapshotChanges().subscribe(res=>{
  this.users=[]
res.forEach(element => {
  let ens={}
  //console.log(element.key):idUser
  ens['id']=element.key
  ens['name']=element.payload.val()['name']
  ens['phone']=element.payload.val()['phone']
  ens['email']=element.payload.val()['email']
  ens['role']=element.payload.val()['role']
  if(element.payload.val()['role']!='super')
 
  this.users.push(ens)
  console.log(  this.users)
});

})


   }

  admin:Admin=new Admin();
  users:any=[];
  ngOnInit(): void {
  }
  setUserStatus(idUser:any,status:any)
  {
    //console.log(idUser)
     this.superAdminService.setStatus(idUser,status)
    
  }
  
}
