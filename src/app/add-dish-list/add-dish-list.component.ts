import { Component, OnInit } from '@angular/core';
import { Menu } from '../models/menu';
import { RestaurantService } from '../services/restaurant.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-add-dish-list',
  templateUrl: './add-dish-list.component.html',
  styleUrls: ['./add-dish-list.component.css']
})
export class AddDishListComponent implements OnInit {

  constructor(private resService:RestaurantService) {
    this.showMenu=new Menu();
    this.Restaukey=localStorage.getItem('userId');
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

  retrieveAllMenus() {
    
    this.resService.getMenusList(this.Restaukey).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(menus => {
      this.menus = menus;
  // console.log( this.menus)
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
showMenuToUpdate(toUpdateMenu:any)
{
  console.log(toUpdateMenu)
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
  this.resService.updateMenu(this.Restaukey,this.menuKey,this.newMenu) .catch(error => { console.log(error); });
}
}
