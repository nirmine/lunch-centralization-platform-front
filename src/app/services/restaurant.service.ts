import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Menu } from '../models/menu';
import { observable, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from '../models/restaurant';
import { finalize, map } from 'rxjs/operators';

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
  let filePath = `${this.restauStoragePath+'/'+restauKey}/${fileUpload.file.name}`;
  let storageRef = this.storage.ref(filePath);
  let uploadTask = this.storage.upload(filePath, fileUpload.file);
  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
        console.log('File available at', downloadURL);
        fileUpload.url = downloadURL;
        fileUpload.name = fileUpload.file.name;
       // this.saveRestauImageData(restauKey,fileUpload);
        this.db.list(this.restauPath+'/'+restauKey+'/img').push(fileUpload);
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

updateDishNumber(idRestau:any,idUser:any,idDish:any,nbrPieces:number,note:any,total:any)
{
  /*let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+idUser);
  ref.child(idDish).set(nbrPieces);*/
let ens={}
ens[idDish]=nbrPieces;
  let orderRef=this.db.list(this.ordersPath+'/'+idRestau);
     orderRef.update(idUser,ens);
     let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+idUser);
     ref.child("note").set(note);
     ref.child("total").set(total);
  return ref.child("status").set("confirmed");
   
}
setOrderOfUserStatus(idRestau:any,idUser:any,idDish:any,status:any)
{
  let ref=this.db.database.ref(this.ordersPath+'/'+idRestau+'/'+idUser);
  return ref.child("status").set("confirmed");
}
deleteOrderedDish(idRestau:any,idUser:any,idDish:any): Promise<void> {
  let menuRef=this.db.list(this.ordersPath+'/'+idRestau+'/'+idUser);
  return menuRef.remove(idDish);
}
getOrdersOfUser(idUser:any)//returns all the orders of all restaurants
{

  return this.db.list('/orders', ref => ref.orderByKey());
}

getOrderOfUserByIdRestau(idRestau:any,idUser:any)//returns the order of a user in a certain restaurant
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
    this.getOrdersByIdRestau(idRestau).snapshotChanges().subscribe(res=>{
     
      if(res.length==2)
      this.db.list(this.ordersPath).remove(idRestau);
    })
    
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
getInfoUserById(idUser:any)//returns all the informations about this user
{
 // console.log(idUser)
  return this.db.list('/users', ref => ref.orderByKey().equalTo(idUser));
}

updateOrderStatus(idRestau:any,status:any)//changes the status of a whole order of a restau
{
  let ref=this.db.database.ref(this.ordersPath+'/'+idRestau);
  return ref.child("status").set(status);
}

setDelivery(idRestau:any,volunteer:any)
{
 
  let reference=this.db.database.ref(this.ordersPath+'/'+idRestau);
  
       reference.child("delivery").set(volunteer);
     
}

getInfoUser(idUser,ens:any)
  {
    this.getInfoUserById(idUser).snapshotChanges().subscribe(infos => {
     //console.log(infos[0].payload.val()['name'])
      //ens.push(infos[0].payload.val()['name'])
       ens["userName"]=infos[0].payload.val()['name']
       ens["userPhone"]=infos[0].payload.val()['phone']
        }, (error) => {
          console.log(error);
        });
  }

getInfosDish(idRestau,idDish:any)
{ //console.log(idRestau)
  return this.db.list('/restaurants/'+idRestau+'/menu', ref => ref.orderByKey().equalTo(idDish))
}
/*getInfosDishById(idRestau,idDish:any,ens:any)
{ /*console.log(idRestau)
  console.log(idDish)
 this.getInfosDish(idRestau,idDish).snapshotChanges().subscribe(infos => {
     // console.log(infos[0].payload.val())
    ens["dishPrice"]=infos[0].payload.val()['price']
   console.log(ens)
     }, (error) => {
       console.log(error);
     });
}*/

getImageSrc(idRestau:any,idDish:any,ens:any) //returns the url of the dish's image
{
  let url="";
  let menu
  let elt:any={};
    let e:any={};
    this.getMenusList(idRestau).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(menus => {
      menu = menus;
   // console.log(menu)//[{},{},..]:the list of dishs
  for (elt in menu) //0/1/2....
  {
   // console.log( elt)//this.menus[0]['img'][ elt['img']].url)
  // console.log(menu[elt]['name'])
    if(menu[elt]['name']==idDish)
   {
    for (e in menu[elt]['img']) //e=key of the image
    {
     // console.log(menus[elt]['img'][e].url) //: dish's url 
      //console.log( this.menus[elt]['name']) : dish's name
      //console.log(e)
      //console.log(menu[elt]['img'][e].url)
      ens['url']=menu[elt]['img'][e].url
     }
    }

   }
    
    
    }, (error) => {
      console.log(error);
    });   
    
}

getRestauImg(idRestau:any)
{
 
  return this.db.list(this.restauPath+'/'+idRestau, ref => ref.orderByKey().equalTo('img'));

}
getDishImg(idRestau:any,idDish:any)
{
 console.log(idDish)
  return this.db.list(this.restauPath+'/'+idRestau+'/menu/'+idDish, ref => ref.orderByKey().equalTo('img'));

}

getRestauImageSrc(idRestau:any,ens:any)
{
  let url="";
  let restau
  let elt:any={};
    let e:any={};
  this.getRestauImg(idRestau).snapshotChanges().subscribe(res=>{
    elt=res[0].payload.val()
    for(restau in elt)//restau:image key
    //console.log(elt[restau].url)
    ens['ImageUrl']=elt[restau].url
  })
    
}

deleteRestau(restauKey:any) {
  let restauRef=this.db.list(this.restauPath);
restauRef.remove(restauKey);
  this.db.list(this.ordersPath).remove(restauKey);
}


}
