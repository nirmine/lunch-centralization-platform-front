import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute)
  { 
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    
    this.getOrders();

  }

 
  ngOnInit(): void {
  }

  order:any={}
  ordersByUser:any=[]
  orders:any=[]
  getOrders()
  {
    let ens:any={}
    this.restauService.getOrdersOfUser("1").snapshotChanges().subscribe(orders => {
      //console.log(orders[1].payload.val())
        orders.forEach(element => {
          //console.log(element.key):restaurant key
          this.order={}
        let restauOrders:any=[];
         let  ordersSet:any={}
         ens=element.payload.val()
         //for(j in ens)//e:idUsers
    
        
         ens=element.payload.val()
          let e;
          let x;
          let   el:any;
          let ch:string=""
          let liste=[];
          let status;
          for(e in ens)//e:idUsers
          {
            
            if(e!="delivery" && e!="status")
            {
            ordersSet={}
            ch=""
    
         


           for(el in ens[e])//this.ens[e]:the list of this user's orders//el:dish's names
           {  
             if(el != "status")
              {
               
                 ch=ch+'\n '+ ens[e][el]+' '+el
                
               }
               else
              
                status=ens[e][el]
               
            }
          

                  //ch=ch+'\n '+this.ens[e][el]+' '+el
                 /* liste.push(ch)
                  liste.push(status)*///the order status :it could be undefined
                  ordersSet["orderList"]=ch;
                  ordersSet["idUser"]=e;
                 // ordersSet["idRestau"]=element.key;
                 this.getInfoUser(e,ordersSet)
                  ordersSet["status"]=status;
                  restauOrders.push(ordersSet)
                  //this.getInfoRestau(element.key,ordersSet)
                 
                  //this.order[element.key]=liste;
                  //this.orders.push(ordersSet)
          }
          else{
            if(e=="status")
            this.order["orderStatus"]=ens[e]
          }
            
          }
            this.order["idRestau"]=element.key
            this.getInfoRestau(element.key,this.order)
            this.order["orders"]=restauOrders
         this.orders.push(this.order)
  
        });
        console.log(this.orders)//{restauKey:[dishs,status,restauName]}

        }, (error) => {
          console.log(error);
        });
  }
  getInfoRestau(idRestau,ens:any)
  {
    this.restauService.getInfoRestaurantById(idRestau).snapshotChanges().subscribe(infos => {
     //console.log(infos[0].payload.val()['name'])
      //ens.push(infos[0].payload.val()['name'])
       ens["restauName"]=infos[0].payload.val()['name']
       ens["restauPhone"]=infos[0].payload.val()['phoneNumber']
       ens["restauEmail"]=infos[0].payload.val()['email']
        }, (error) => {
          console.log(error);
        });
  }
  getInfoUser(idUser,ens:any)
  {
    this.restauService.getInfoUserById(idUser).snapshotChanges().subscribe(infos => {
     //console.log(infos[0].payload.val()['name'])
      //ens.push(infos[0].payload.val()['name'])
       ens["userName"]=infos[0].payload.val()['name']
        }, (error) => {
          console.log(error);
        });
  }

  /* order:any={}
  
  orders:any=[]*/ 
  getAllOrders()
  {
    let ens:any={}
    this.restauService.getOrdersOfUser("1").snapshotChanges().subscribe(orders => {
      //console.log(orders[1].payload.val())
        orders.forEach(element => {
          //console.log(element.key):restaurant key
        
         let  ordersSet:any={}
         ens=element.payload.val()
         //for(j in ens)//e:idUsers
    
        
         ens=element.payload.val()
          let e;
          let x;
          let   el:any;
          let ch:string=""
          let liste=[];
          let status;
          for(e in ens)//e:idUsers
          {
            
            if(e!="delivery" && e!="status")
            {
            ordersSet={}
            ch=""
    
         


           for(el in ens[e])//this.ens[e]:the list of this user's orders//el:dish's names
           {  
             if(el != "status")
              {
               
                 ch=ch+'\n '+ ens[e][el]+' '+el
                
               }
               else
              
                status=ens[e][el]
               
            }
          

                  //ch=ch+'\n '+this.ens[e][el]+' '+el
                  liste.push(ch)
                  liste.push(status)//the order status :it could be undefined
                  ordersSet["orderList"]=ch;
                  ordersSet["idUser"]=e;
                  ordersSet["idRestau"]=element.key;
        
                  ordersSet["status"]=status;
                  this.getInfoRestau(element.key,ordersSet)
                  this.getInfoUser(e,ordersSet)
                  this.order[element.key]=liste;
                  this.orders.push(ordersSet)
          }
            
          }
  
          console.log(this.orders)//{restauKey:[dishs,status,restauName]}
  
        });
        }, (error) => {
          console.log(error);
        });
  }

  sendOrder(idRestau:any)
  {
    this.restauService.updateOrderStatus(idRestau,"sent")
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }

  }

  allAccepted(idRestau:any):boolean
  {
    let notConfirmed=false;
    
    this.orders.forEach(element => {
      if(element.idRestau==idRestau)
        {
          element.orders.forEach(elt => {
              console.log(elt)
              if(elt.status=='not confirmed' || element.orderStatus=='sent')
                notConfirmed=true
          });
        }
    });

    
    return notConfirmed
  }
}
