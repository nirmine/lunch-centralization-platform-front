import { BackService } from './../services/back.service';
import { SuperAdminService } from './../services/super-admin.service';
import { RestaurantService } from './../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signin-admin',
  templateUrl: './signin-admin.component.html',
  styleUrls: ['./signin-admin.component.css']
})
export class SigninAdminComponent implements OnInit {

  constructor(private backService:BackService,private router : Router, private route: ActivatedRoute,private restauService:RestaurantService,private adminService:SuperAdminService) 
  {
   // console.log( sessionStorage.getItem('isConnected'))
    this.backService.getPWDValidationStatus().subscribe(res=>{console.log(res)})
   }
  erreur = true;
  noAdmin=true;
  user:any={};
  userName="";
  userPwd:any;
  userRole:any;
  //userPwd:any;
  //userRole:any;
  ngOnInit(): void {
  }
  checkLogin(form) {
    // console.log(form.value)
     //this.getInfosUser(form);
     this.isAuthenticated(form)
     
   }
 
   isAuthenticated(form) {
    
    /* if(form.value.id=="bigBoss@proxym-it.com")
    {
      if(form.value.password=="bigBoss")
        {
          sessionStorage.setItem('role', 'super');
          //sessionStorage.setItem('userId', this.user.id);
          sessionStorage.setItem('isConnected', 'true');
          console.log(form.value.password)  //this.userPwd)
          console.log(form.value.id) 
          this.router.navigate(['dashboard-super']);
        }
        else
        {
          this.erreur = false;
        }
    }
    else
     {*/
       
    /* this.adminService.getInfoAdminById(form.value.id).snapshotChanges().subscribe(infos => {
       //console.log(infos[0].payload.val()['name'])
        //ens.push(infos[0].payload.val()['name'])
        //console.log(infos.length)
        if(infos.length==0)
        {
         console.log("user inexistant")
         this.erreur = false;
        }
        
        else{
  
         if (form.value.password == infos[0].payload.val()['password'])//if (this.user.password === this.userPwd)
         {
           sessionStorage.setItem('isConnected', 'true');
          //console.log('connected')
          
          sessionStorage.setItem('role', 'admin');
          sessionStorage.setItem('userId', this.user.id);
          this.router.navigate(['dashboard-admin']);
          } else 
          {
          this.erreur = false;
          }
 
 
 
        }
         
          }, (error) => {
            console.log(error);
          });*/

          this.restauService.getInfoUserById(form.value.id).snapshotChanges().subscribe(infos => {
            //console.log(infos[0].payload.val()['name'])
             //ens.push(infos[0].payload.val()['name'])
             //console.log(infos.length)
             if(infos.length==0)
             {
              console.log("user inexistant")
              this.erreur = false;
             }
             
             else{
              if(infos[0].payload.val()['role']=="super")
              {
                if (form.value.password == infos[0].payload.val()['password'])
                {
                  sessionStorage.setItem('isConnected', 'true');
                 console.log('connected')
                 
                 sessionStorage.setItem('role','super');
                 sessionStorage.setItem('userId', this.user.id);
                 sessionStorage.setItem('name', infos[0].payload.val()['name']);
                 this.router.navigate(['addNewAdmin']);
                 } else 
                 {
                 this.erreur = false;
                 }

              }
              else
               {
               if(infos[0].payload.val()['role']=="admin")
              {
               this.userRole="admin"
              this.userName=infos[0].payload.val()['name']
              this.userPwd=infos[0].payload.val()['password']
      
              if (form.value.password == infos[0].payload.val()['password'])
              {
                sessionStorage.setItem('isConnected', 'true');
               console.log('connected')
               
               sessionStorage.setItem('role','admin');
               sessionStorage.setItem('userId', this.user.id);
               sessionStorage.setItem('name', infos[0].payload.val()['name']);
               this.router.navigate(['dashboard-admin']);
               } else 
               {
               this.erreur = false;
               }
             }
             else 
             {
             this.noAdmin = false;
             }
            }


      
             }
              
               }, (error) => {
                 console.log(error);
               });
      






      //  }
 
 
  
     }
}
