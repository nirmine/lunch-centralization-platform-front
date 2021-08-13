import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant-admin',
  templateUrl: './add-restaurant-admin.component.html',
  styleUrls: ['./add-restaurant-admin.component.css']
})
export class AddRestaurantAdminComponent implements OnInit {

  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute) { }
error=true;
existingError=true
  restau:any={};
  ngOnInit(): void {
  }
  onSubmit()
  {
    let ch:string=this.restau.id;
    if(ch.indexOf('.')>0 || ch.indexOf('[')>0 || ch.indexOf('#')>0 || ch.indexOf(']')>0 || ch.indexOf('$')>0)
    {console.log(this.restau);
      this.error=false;
    }
    else
    {
      this.restauService.getInfoRestaurantById(this.restau.id).snapshotChanges().subscribe(res=>{
        console.log(res.length)
        if(res.length>0)
        this.existingError=false
        else
        {
          this.restauService.createRestaurant(this.restau.id,this.restau);
          this.router.navigate(['restaus-list']);
        }
        
      })
      
      /*this.restauService.createRestaurant(this.restau.id,this.restau);
    this.router.navigate(['restaus-list']);*/
    }
  }

}
