import { FileUpload } from './../models/restaurant';
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
   /* this.menu= new Menu();
    this.currentFileUpload=new FileUpload(null);*/
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
  }

  onSubmit() {
    this.save();
    this. upload();
   
    console.log("done")
  }

  test()
  {

  }
  
  currentFileUpload: FileUpload;
  percentage: number;
  selectedFiles: FileList;
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.restService.pushFileToStorage(this.userId,this.menu.name,this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        if(this.percentage==100)
          {
            console.log("100");
            this.reset();
          }
      },
      error => {
        console.log(error);
      }
    );
  }
}
