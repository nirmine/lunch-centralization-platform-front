import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from '../models/restaurant';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private MenuPath = '/menu';
  private restauPath = '/restaurants';
  menusRef: AngularFireList<Menu> ;

  constructor(public db: AngularFireDatabase,private Http: HttpClient,private storage: AngularFireStorage) { 
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

  
  private dishStoragePath = '/dishs';
  
  pushFileToStorage(restauKey:any,dishkey:any,fileUpload: FileUpload): any {
    let filePath = `${this.dishStoragePath}/${fileUpload.file.name}`;
    let storageRef = this.storage.ref(filePath);
    let uploadTask = this.storage.upload(filePath, fileUpload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          console.log('File available at', downloadURL);
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(restauKey,dishkey,fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }
   saveFileData(restauKey:any,dishkey:any,fileUpload: FileUpload) {
    this.db.list(this.restauPath+'/'+restauKey+'/menu/'+dishkey+'/img').push(fileUpload);
  }


getImages()
{
 let itemValue = '';
  let items: any;
  items = this.db.list('items').valueChanges();
}














}
