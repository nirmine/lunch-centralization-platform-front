import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant-admin',
  templateUrl: './add-restaurant-admin.component.html',
  styleUrls: ['./add-restaurant-admin.component.css']
})
export class AddRestaurantAdminComponent implements OnInit {

  constructor(private restauService:RestaurantService) { }

  restau:any={};
  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log(this.restau);
    this.restauService.createRestaurant(this.restau.id,this.restau);
  }

}
