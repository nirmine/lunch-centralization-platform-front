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


  constructor(private superAdminService: SuperAdminService,private router : Router, private route: ActivatedRoute) { }

  admin:Admin=new Admin();
  ngOnInit(): void {
  }
  save() {
    
   this.superAdminService.createAdminByKey(this.admin.id,this.admin);
     console.log("done");
     alert("admin is successfully added");
     this.router.navigate(['home']);
  }
  cancel()
  {
    this.router.navigate(['home']);
  }
}
