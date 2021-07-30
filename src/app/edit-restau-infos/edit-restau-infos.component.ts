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
    this.restau.delivery="no";
    //console.log(this.currentFileUpload)
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
     if(this.selectedFiles!=undefined)
     this. upload();
     else
     this.router.navigate(['dashboard-restau']);
     //this.reset();
    // this.router.navigate(['dashboard-restau']);
    
   }

   currentFileUpload: FileUpload;
   percentage: number;
   selectedFiles: FileList;
   selectFile(event) {
     this.selectedFiles = event.target.files;
     console.log(this.selectedFiles)
   }
   upload() {
     const file = this.selectedFiles.item(0);
     this.selectedFiles = undefined;
 
     this.currentFileUpload = new FileUpload(file);
     this.restService.pushRestauImageToStorage(this.idUser,this.currentFileUpload).subscribe(
       percentage => {
         this.percentage = Math.round(percentage);
        /*if(this.percentage==100)
           {
             console.log("100");
            
           //  
           }*/
         
       },
       error => {
         console.log(error);
       }
     );
  // this.router.navigate(['dashboard-restau']);
  this.restService.getRestauImg(this.idUser).snapshotChanges().subscribe(infos => {
    console.log(infos.length)
    if(infos.length)
    this.router.navigate(['dashboard-restau']);
  });

   }
}
