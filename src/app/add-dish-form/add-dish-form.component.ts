import { FileUpload } from './../models/restaurant';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { RestaurantService } from '../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-dish-form',
  templateUrl: './add-dish-form.component.html',
  styleUrls: ['./add-dish-form.component.css']
})
export class AddDishFormComponent implements OnInit {

  constructor(public restService: RestaurantService,private router : Router, private route: ActivatedRoute) { 
    this.menu = new Menu();
   console.log(sessionStorage.getItem('keyRestau'))
   this.Restaukey=sessionStorage.getItem('keyRestau');
   this.userId=sessionStorage.getItem('userId');
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
        
      },
      error => {
        console.log(error);
      }
    );
    this.restService.getDishImg(this.userId,this.menu.name).snapshotChanges().subscribe(infos => {
      console.log(infos)
     if(infos.length!=0)
      //this.router.navigate(['addNewDish']);
      if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
        localStorage.setItem('firstReload', 'false');
        window.location.reload();
      } else {
        localStorage.setItem('firstReload', 'true');
      }
       // this.reset();
    });
  }
}
