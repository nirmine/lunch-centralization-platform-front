import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNumber } from 'util';


import { FileUpload } from '../models/restaurant';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-edit-restau-infos',
  templateUrl: './edit-restau-infos.component.html',
  styleUrls: ['./edit-restau-infos.component.css']
})
export class EditRestauInfosComponent implements OnInit {



  constructor(public restService: RestaurantService ,private router : Router, private route: ActivatedRoute) { 
    
  
    this.idUser=sessionStorage.getItem('userId');
    
    this. getInfoRestau(this.idUser)
    console.log(this.idUser)
      this.restService.getRestauImageSrc(this.idUser,this.imgSrc)
     
    /* if(this.restau.delivery==undefined || this.restau.length==0)
     this.restau.delivery="no";*/
      console.log(this.restau.delivery)
   }
   idUser:any;
 
   restau:  any={};
   emailError=true;
   phoneError=true;
   imgSrc:any={};
   priceError=true;
   deliveryError=true
   ngOnInit(): void {
 
   }
   save() {
     /*let keyRestau= this.restService.createCustomer(this.restau).key;
      localStorage.setItem('keyRestau', keyRestau);*/
     
      console.log(this.restService.updateRestau(this.idUser,this.restau));
   }
   reset(){
  
   }
 
   onSubmit() {
  /* if( this.isEmail(this.restau.email) && isNaN(Number(this.restau.phoneNumber))==false)
     {*/
       if(isNaN(Number(this.restau.phoneNumber))==false && isNaN(Number(this.restau.phoneNumber[0]))==false && this.restau.phoneNumber.length==8)
       {
          if(this.restau.email.length!=0)//check if it is an email 
          { console.log("1")
            if( !this.isEmail(this.restau.email) )
           {
            this.emailError=false
            console.log("2")
           } 
            else{
              if(this.restau.delivery==undefined)
              {
                console.log("3")
               // this.restau.delivery="no";
                  this.deliveryError=false
              }
              else
              {
              if( this.restau.delivery=="no")
              {this.restau.price=""
              console.log("4")
             
              if(this.selectedFiles!=undefined)
                {
                  this. upload();
                  this.save();
                } 
              else
                 {
                  this.save();
                  this.router.navigate(['dashboard-restau']);
              }
              }
              else
               {
                if( this.restau.delivery=="yes")
                {
                  console.log("5")
                  if( this.restau.price==undefined || this.restau.price=="")
                this.priceError=false
                else
             {  
                if(this.selectedFiles!=undefined)
              {
                this. upload();
                this.save();
              } 
            else
               {
                this.save();
                this.router.navigate(['dashboard-restau']);
            }
             }}
               }
              }
            }
          }

          else
     {   
    /*  if(this.restau.delivery==undefined)
      this.restau.delivery="no";
       this.save();
     if(this.selectedFiles!=undefined)
     this. upload();
     else
     this.router.navigate(['dashboard-restau']);*/
     if(this.restau.delivery==undefined)
     {
       this.restau.delivery="no";

     }
     if( this.restau.delivery=="no")
              {this.restau.price=""
              console.log("4")
              this.save();
              if(this.selectedFiles!=undefined)
              this. upload();
              /*else
              this.router.navigate(['dashboard-restau']);*/
              }
     else
      {
       if( this.restau.delivery=="yes")
       {
         if( this.restau.price==undefined || this.restau.price=="")
       this.priceError=false
       else
    { this.save();
     if(this.selectedFiles!=undefined)
     this. upload();
     /*else
     this.router.navigate(['dashboard-restau']);*/
    }}
      }

     }
    }

    else
    this.phoneError=false
   
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

   
    isEmail(search:string):boolean //returns true if it is a valid email
    {
        var  serchfind:boolean;

       let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(search);

        console.log(serchfind)
        return serchfind
    }
    getInfoRestau(idRestau)
  {
    this.restService.getInfoRestaurantById(this.idUser).snapshotChanges().subscribe(infos => {
      //console.log(infos[0].payload.val()['name'])
  
       this.restau.name=infos[0].payload.val()['name']
       this.restau.phoneNumber=infos[0].payload.val()['phoneNumber']
      this.restau.email=infos[0].payload.val()['email']
      this.restau.delivery=infos[0].payload.val()['delivery']
      this.restau.price=infos[0].payload.val()['price']
      this.restau.address=infos[0].payload.val()['address']
      
         }, (error) => {
           console.log(error);
         });
  }
}
