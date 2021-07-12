import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css']
})
export class AddDishFormComponent implements OnInit {

  constructor(public restService: RestaurantService) { 
    this.menu = new Menu();
   console.log(localStorage.getItem('keyRestau'))
   this.Restaukey=localStorage.getItem('keyRestau');
   this.userId=localStorage.getItem('userId');
   console.log(this.userId);
  }
  Restaukey:any;
  menu:  Menu;
  userId:any;
  testimage:any;
  ngOnInit(): void {

  }
  save() {
      this.restService.createDishByKey(this.userId,this.menu.name, this.menu);
     // this.restService.addDishToRestaurant(this.menu.name,this.userId)
  }
  /*
  save(key:string) {
      this.restService.createMenu( key,this.menu);
  }
  */
  reset(){
    this.menu= new Menu();
  }

  onSubmit() {
    this.save();
    this.reset();
  }

  test()
  {

  }
  
}
