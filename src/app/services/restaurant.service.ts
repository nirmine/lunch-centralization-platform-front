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
  private ordersPath = '/orders';
  private finishedOrdersPath = '/finishedOrders';
  menusRef: AngularFireList<Menu> ;

  constructor(public db: AngularFireDatabase,private Http: HttpClient,private storage: AngularFireStorage) { 
    this.menusRef = db.list(this.MenuPath);
    this.restausRef=db.list(this.restauPath)
  }
  
  createDishByKey(restauKey:any,dishkey:any,dish:Menu)
  {
    let ref=this.db.database.ref(this.restauPath+'/'+restauKey+'/menu');
  ref.child(dishkey).set(dish);
 
  }
  createRestaurant(restauKey:any,restau: any): any {
    let ref=this.db.database.ref(this.restauPath);
    return ref.child(restauKey).set(restau);
   }


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
    let filePath = `${this.dishStoragePath+'/'+restauKey}/${fileUpload.file.name}`;
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

restausRef: AngularFireList<any> ;
createCustomer(restauKey:any,restau:any): any {
  let ref=this.db.database.ref(this.restauPath);
      return ref.child(restauKey).set(restau);
 }

 updateRestau(key: any, value: any): Promise<void> {
  return this.restausRef.update(key, value);
}

private restauStoragePath = '/restaus';
pushRestauImageToStorage(restauKey:any,fileUpload: FileUpload): any {
  let filePath = `${this.restauStoragePath}/${fileUpload.file.name}`;
  let storageRef = this.storage.ref(filePath);
  let uploadTask = this.storage.upload(filePath, fileUpload.file);
  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
        console.log('File available at', downloadURL);
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveRestauImageData(restauKey,fileUpload);
      });
    })
  ).subscribe();
  return uploadTask.percentageChanges();
}
 saveRestauImageData(restauKey:any,fileUpload: FileUpload) {
  this.db.list(this.restauPath+'/'+restauKey+'/img').push(fileUpload);
}


getRestauList(): AngularFireList<any> //returns the list of all restaurants
{
  //console.log(this.restausRef)
  return  this.restausRef;
}

updateOrderList(userId:any,dishkey:any,idRestau:any,nbrPieces:number)
{
  let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+userId);
  ref.child(dishkey).set(nbrPieces);
  let refe=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+userId);
   refe.child("status").set("not confirmed");
   let reference=this.db.database.ref(this.ordersPath+'/'+idRestau);
   this.getInfoRestaurantById(idRestau).snapshotChanges().subscribe(infos => {

     if(infos[0].payload.val()['delivery']=="no")
      {
        reference.child("delivery").set("not restaurant");
      }
      else
      {
        if(infos[0].payload.val()['delivery']=="yes")
        reference.child("delivery").set("restaurant");
      }
      

       }, (error) => {
         console.log(error);
       });
 

}


pushupdatedFileToStorage(imageKey:any,restauKey:any,dishkey:any,fileUpload: FileUpload): any {
  let filePath = `${this.dishStoragePath+'/'+restauKey}/${fileUpload.file.name}`;
  let storageRef = this.storage.ref(filePath);
  let uploadTask = this.storage.upload(filePath, fileUpload.file);
  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
        console.log('File available at', downloadURL);
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
        this.saveupdatedFileData(imageKey ,restauKey,dishkey,fileUpload);
      });
    })
  ).subscribe();
  console.log(imageKey)
  return uploadTask.percentageChanges();
}
 saveupdatedFileData(imageKey:any,restauKey:any,dishkey:any,fileUpload: FileUpload) {
  this.db.list(this.restauPath+'/'+restauKey+'/menu/'+dishkey+'/img').update(imageKey ,fileUpload);
}

getOrdersByIdRestau(idRestau:any)//return all the orders of a certain restaurant
{
  return this.db.list('/orders/'+idRestau, ref => ref.orderByKey());
}
getDishInfoById(idRestau:any,idDish:any)
{
  //console.log(idDish)
  let ch:string=idDish;
  return this.db.list('/restaurants/'+idRestau+'/menu', ref => ref.orderByKey().equalTo(ch));
}

updateDishNumber(idRestau:any,idUser:any,idDish:any,nbrPieces:number)
{
  /*let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+idUser);
  ref.child(idDish).set(nbrPieces);*/
let ens={}
ens[idDish]=nbrPieces;
  let orderRef=this.db.list(this.ordersPath+'/'+idRestau);
     orderRef.update(idUser,ens);
     let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+idUser);
  return ref.child("status").set("confirmed");
   
}

deleteOrderedDish(idRestau:any,idUser:any,idDish:any): Promise<void> {
  let menuRef=this.db.list(this.ordersPath+'/'+idRestau+'/'+idUser);
  return menuRef.remove(idDish);
}
getOrdersOfUser(idUser:any)
{

  return this.db.list('/orders', ref => ref.orderByKey());
}

getOrderOfUserByIdRestau(idRestau:any,idUser:any)
{

  return this.db.list('/orders/'+idRestau, ref => ref.orderByKey().equalTo(idUser));
}
getInfoRestaurantById(idRestau:any)//returns all the informations about this restaurant
{
  return this.db.list('/restaurants', ref => ref.orderByKey().equalTo(idRestau));
}
deleteOrderOfUser(idRestau:any,idUser:any): Promise<void> {
  let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+idUser);
  return ref.child("status").set("canceled");
}

setOrderAsDone(idRestau:any,idUser:any,id:any)
{
  let ens={};
  let x="0";
  let ref=this.db.database.ref(this.finishedOrdersPath+'/'+idRestau);
  let orderRef=this.db.list(this.ordersPath+'/'+idRestau);
  this.getOrderOfUserByIdRestau(idRestau,idUser).snapshotChanges().subscribe(infos => {
   
   ens=infos[0].payload.val();
   ens['status']="done"
   ens['idUser']=idUser;
   
   // id.push(ref.push(ens).key)
   ref.push(ens)
  orderRef.remove(idUser)

    
       }, (error) => {
         console.log(error);
       });

}
getFinishedOrdersOfUser(idUser:any)
{

  return this.db.list(this.finishedOrdersPath, ref => ref.orderByKey());
}
setFeedbackAboutOrder(restauKey:any,key:any,feed:any)
{
  let ref=this.db.database.ref(this.finishedOrdersPath+'/'+restauKey+'/'+key);
  return ref.child("feedback").set(feed);
}
getInfoUserById(idUser:any)//returns all the informations about this restaurant
{
  return this.db.list('/users', ref => ref.orderByKey().equalTo(idUser));
}

updateOrderStatus(idRestau:any,status:any)
{
  let ref=this.db.database.ref(this.ordersPath+'/'+idRestau);
  return ref.child("status").set(status);
}
}
