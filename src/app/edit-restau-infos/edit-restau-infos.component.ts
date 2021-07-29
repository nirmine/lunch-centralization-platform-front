import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-edit-restau-infos',
  templateUrl: './edit-restau-infos.component.html',
  styleUrls: ['./edit-restau-infos.component.css']
})
export class EditRestauInfosComponent implements OnInit {



  constructor(public restService: RestaurantService ,private router : Router, private route: ActivatedRoute) { 
    // this.restau = new  Restaurant();
    this.idUser=sessionStorage.getItem('userId');
   }
   idUser:any;
   restau:  any={};
   ngOnInit(): void {
 
   }
   save() {
     /*let keyRestau= this.restService.createCustomer(this.restau).key;
      localStorage.setItem('keyRestau', keyRestau);*/
      console.log(this.restService.updateRestau(this.idUser,this.restau));
   }
   reset(){
     //this.restau = new Restaurant();
   }
 
   onSubmit() {
     this.save();
     this. upload();
     this.reset();
     
     //this.router.navigate(['addNewMenu']);
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
     this.restService.pushRestauImageToStorage(this.idUser,this.currentFileUpload).subscribe(
       percentage => {
         this.percentage = Math.round(percentage);
        /* if(this.percentage==100)
           {
             console.log("100");
             this.reset();
           }*/
       },
       error => {
         console.log(error);
       }
     );
   }
}
