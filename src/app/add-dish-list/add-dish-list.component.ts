import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu';
import { RestaurantService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';
import { FileUpload } from '../models/restaurant';
@Component({
  selector: 'app-add-dish-list',
  templateUrl: './add-dish-list.component.html',
  styleUrls: ['./add-dish-list.component.css']
})
export class AddDishListComponent implements OnInit {

  constructor(private resService:RestaurantService) {
    this.showMenu=new Menu();
    this.Restaukey=sessionStorage.getItem('userId');
    this.retrieveAllMenus();
    this.deletedMenu=new Menu();
    this.update=false;
   
    //console.log( this.menus);
   }
   update:boolean;
  menus: any = {};
  showMenu: Menu;
  isSelected: boolean = false;
  deletedMenu: Menu;
  Restaukey:any;
  ngOnInit(): void {
  }
  setMenuDetails(menu: Menu){
    this.isSelected=!this.isSelected;
    if(this.isSelected){
      this.showMenu = menu;
    } else {
      this.showMenu=new Menu();
    }
  }
  map = new Map();
  retrieveAllMenus() {
    let elt:any={};
    let e:any={};
    this.resService.getMenusList(this.Restaukey).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(menus => {
      this.menus = menus;
     
  for (elt in this.menus) 
  {
    //console.log( elt)//this.menus[0]['img'][ elt['img']].url)
    for (e in this.menus[elt]['img']) //e=key
    {
      //console.log(this.menus[elt]['img'][e].url) : dish's url 
      //console.log( this.menus[elt]['name']) : dish's name
       this.map.set(this.menus[elt]['name'],this.menus[elt]['img'][e].url);
     }

   }
     
       console.log(this.map);
    }, (error) => {
      console.log(error);
    });           
  }

  prepareDeleteMenu(deleteMenu:any)
  {
    this.update=false;
    //assign delete-Customer
    this.deletedMenu =deleteMenu;
  //  console.log(deleteMenu.key);
    this.deleteMenu(deleteMenu.key);
   
  }

  deleteMenu(deleteMenu:string)
  {    
    this.resService.deleteMenu(this.Restaukey,deleteMenu).catch(error => {  console.log(error); });
  }


menuName:string="";
menuComposition:string="";
menuKey:string="";
newMenu:  any={};
dishImageKey:any="";
showMenuToUpdate(toUpdateMenu:any)
{
  let elt:any={};
    let e:any={};
    
    for(elt in toUpdateMenu.img)
    this.dishImageKey=elt;
  //console.log(toUpdateMenu.img.key)

this.update=true;
//this.varGlobals.update=true;
this.newMenu.name=toUpdateMenu.name;
this.newMenu.composition=toUpdateMenu.composition;
this.newMenu.price=toUpdateMenu.price;
this.menuKey=toUpdateMenu.key;


}
updateDish()
{
  this.update=false;
  this.upload();
  this.resService.updateMenu(this.Restaukey,this.menuKey,this.newMenu) .catch(error => { console.log(error); });
}

test()
{
  console.log(this.menus)
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
  this.resService.pushupdatedFileToStorage(this.dishImageKey,this.Restaukey,this.newMenu.name,this.currentFileUpload).subscribe(
    percentage => {
      this.percentage = Math.round(percentage);
     
    },
    error => {
      console.log(error);
    }
  );
}
}
