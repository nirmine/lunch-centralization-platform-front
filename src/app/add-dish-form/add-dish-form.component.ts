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
   console.log(sessionStorage.getItem('userId'))
  // this.Restaukey=sessionStorage.getItem('keyRestau');
   this.userId=sessionStorage.getItem('userId');
   console.log(this.userId);
  }
 // Restaukey:any;
  menu:  Menu;
  userId:any;
  testimage:any;
  nameError=true;
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
   /* this.save();
    this. upload();*/
   
    if(this. checkForm())
    {
      this.save();
    this. upload();
    }
  }

 
  
  currentFileUpload: FileUpload;
  percentage: number;
  selectedFiles: FileList;
  isSelected: boolean = false;
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

  compositionError=true
  priceError=true;
  typeError=true;
  imageError=true;
  checkForm()
  {
    let ch:string=this.menu.name;

    if(ch.indexOf('.')>0 || ch.indexOf('[')>0 || ch.indexOf('#')>0 || ch.indexOf(']')>0 || ch.indexOf('$')>0 || ch=="")
    {
      this.nameError=false;
      //console.log(false)
      return false
    }
    else
    {
      this.nameError=true;
        if(this.menu.composition=="")
        {
          this.compositionError=false
          return false
        }

          else
          {
            this.compositionError=true
            //console.log( parseInt(this.menu.price))
            if(isNaN(parseInt(this.menu.price)))
            {
              this.priceError=false
              return false
            }
              else
              {
                this.priceError=true
                if(this.menu.type=="")
              {
                this.typeError=false
               return false
               }
              else
                {
                  this.typeError=true
                  if(this.selectedFiles==undefined)
                  {
                    this.imageError=false
                  }
                  else
                  {
                    this.imageError=true
                    return true
                  }
                    
                }
              }
          }

    }



  }
}
