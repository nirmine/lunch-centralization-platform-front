import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private MenuPath = '/menu';
  private restauPath = '/restaurants';
  menusRef: AngularFireList<Menu> ;

  constructor(public db: AngularFireDatabase,private Http: HttpClient) { 
    this.menusRef = db.list(this.MenuPath);
  }
  
  createDishByKey(restauKey:any,dishkey:any,dish:Menu)
  {
    let ref=this.db.database.ref(this.restauPath+'/'+restauKey+'/menu');
  ref.child(dishkey).set(dish);
 
  }


  /*getMenusList(): AngularFireList<Menu> {
    console.log( this.menusRef)
    return this.menusRef;
  }
*/
  getMenusList(restauKey:any): AngularFireList<any> {
   // console.log(restauKey)
    let menuRef=this.db.list(this.restauPath+'/'+restauKey+'/menu');
    //console.log(menuRef);
    return menuRef;
  } 
  deleteMenu(restauKey:any,key: string): Promise<void> {
    let menuRef=this.db.list(this.restauPath+'/'+restauKey+'/menu');
    return menuRef.remove(key);
  }
  updateMenu(restauKey:any,key: string, value: any): Promise<void> {
    console.log(key)
    let menuRef=this.db.list(this.restauPath+'/'+restauKey+'/menu');
    return menuRef.update(key, value);
  }


 
}
