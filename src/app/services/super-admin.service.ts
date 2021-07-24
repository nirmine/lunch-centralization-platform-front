import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Admin } from '../models/admin';
@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  private adminsPath = '/admins';
  adminRef: AngularFireList<Admin> ;
  constructor(public db: AngularFireDatabase) 
  { 
   this.adminRef = db.list(this.adminsPath); 
  }
  createAdminByKey(key:any,admin:Admin): any {
    let ref=this.db.database.ref("/admins");
   return( ref.child(key).set(admin));

  //  return this.adminRef.push(admin);
   }
   getAdminsList(): AngularFireList<Admin> {
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
   }
}
