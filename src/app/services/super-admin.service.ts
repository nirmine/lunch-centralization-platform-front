import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private adminsPath = '/admins';
  private usersPath = '/users';
 // adminRef: AngularFireList<Admin> ;
  constructor(public db: AngularFireDatabase) 
  { 
   //this.adminRef = db.list(this.adminsPath); 
  }
  /*createAdminByKey(key:any,admin:Admin): any {
    let ref=this.db.database.ref("/admins");
   return( ref.child(key).set(admin));

  //  return this.adminRef.push(admin);
   }
   /*getAdminsList(): AngularFireList<Admin> {
    return this.adminRef;
  }
  updateAdminInfo(key: string, value: any): Promise<void> {
    return this.adminRef.update(key, value);
  }
  deleteAdmin(key: string): Promise<void> {
    return this.adminRef.remove(key);
  }

  createUserByKey(key:any,admin:Admin): any {
    let ref=this.db.database.ref("/admins");
   return( ref.child(key).set(admin));

  //  return this.adminRef.push(admin);
   }*/
   getInfoAdminById(idUser:any)//returns all the informations about this restaurant
  {
  console.log(idUser)
  return this.db.list('/admins', ref => ref.orderByKey().equalTo(idUser));
  }
  addAdmin(idUser:any)
  {
    let refe=this.db.database.ref(this. adminsPath);
    refe.child(idUser).set(idUser);
  }
  getAllUsers()
  {
    return this.db.list('/users', ref => ref.orderByKey());
  }
  setStatus(idUser:any,status:any)
  {
    let refe=this.db.database.ref(this.usersPath+'/'+idUser);
    refe.child("role").set(status);
  }
}
