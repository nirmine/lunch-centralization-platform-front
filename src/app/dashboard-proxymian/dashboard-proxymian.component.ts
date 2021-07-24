import { RestaurantService } from './../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-proxymian',
  templateUrl: './dashboard-proxymian.component.html',
  styleUrls: ['./dashboard-proxymian.component.css']
})
export class DashboardProxymianComponent implements OnInit {
  map = new Map();
  idUser:any;
  ens:any={}
  order:any={}
 
 
  orders:any=[]
  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute) {
   this.getAllRestaus();
   this.idUser=localStorage.getItem('userId');
  
  // console.log(this.idUser)
   this.restauService.getOrdersOfUser(this.idUser).snapshotChanges().subscribe(orders => {
    //console.log(orders[1].payload.val())
      orders.forEach(element => {
        //console.log(element.key):restaurant key
       
        
         
        let orderStatus="";
        let  ordersSet:any={}
        this.ens=element.payload.val()
        let e;
        let x;
        let   el:any;
        let ch:string=""
        let liste=[];
        let status;
        let st;
        for(st in this.ens)//e:idUsers
        {
          if(st=="status")
          orderStatus=this.ens[st]
          
        }
        for(e in this.ens)//e:idUsers
        {
          ordersSet={}
          ch=""
          console.log(orderStatus)
        if(e==this.idUser)
        {
         for(el in this.ens[e])//this.ens[e]:the list of this user's orders//el:dish's names
         {  
           if(el != "status")
            {
             
               ch=ch+'\n '+this.ens[e][el]+' '+el
              
             }
             else
            
              status=this.ens[e][el]
             
          }
          
                //ch=ch+'\n '+this.ens[e][el]+' '+el
                liste.push(ch)
                liste.push(status)//the order status :it could be undefined
                ordersSet["orderList"]=ch;
                ordersSet["idRestau"]=element.key;
                ordersSet["status"]=status;
                ordersSet["orderStatus"]=orderStatus;
                this.getInfoRestau(element.key,ordersSet)
                this.order[element.key]=liste;
                this.orders.push(ordersSet)
         }
          
        }

        console.log(this.orders)//{restauKey:[dishs,status,restauName]}

      });
      }, (error) => {
        console.log(error);
      });
     
      this.getFinishedOrders();
   }
restausList:any=[];
  ngOnInit(): void {
  }
  getAllRestaus()
  {
    let elt:any={};
    let e:any={};
      this.restauService.getRestauList().snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(restaus => {
        this.restausList = restaus;
       // console.log(this.restausList)
      for (elt in this.restausList) 
        {
          if(this.restausList[elt]['img']==undefined)
            console.log("undefined")
          else
          {
          for (e in this.restausList[elt]['img']) //e=key
             {
              
              
              
              this.map.set(this.restausList[elt]['name'],this.restausList[elt]['img'][e].url);
             }
            }
        }
        //console.log(this.map);
        
      }, (error) => {
        console.log(error);
      }); 
  }

  goToMenu(idRestau:any)
  {
    localStorage.setItem('restauId',idRestau);
    //console.log(idRestau)
   this.router.navigate(['RestauMenu']);
  }
  
  getInfoRestau(idRestau,ens:any)
  {
    this.restauService.getInfoRestaurantById(idRestau).snapshotChanges().subscribe(infos => {
     //console.log(infos[0].payload.val()['name'])
      //ens.push(infos[0].payload.val()['name'])
       ens["restauName"]=infos[0].payload.val()['name']
        }, (error) => {
          console.log(error);
        });
  }

  cancelOrder(idRestau:any)
  {
      this.restauService.deleteOrderOfUser(idRestau,this.idUser)
  }
  editOrder(idRestau:any)
  {
    localStorage.setItem('userId',this.idUser);
    localStorage.setItem('restauId',idRestau);
    //console.log(idRestau)
    this.router.navigate(['validateOrder']);
  
  }
  giveFeedback(idRestau:any,idOrder:any)
  {
    localStorage.setItem('finishedOrderIdRestau',idRestau);
    localStorage.setItem('finishedOrderKey',idOrder);
   
    //console.log(idOrder)
    this.router.navigate(['feedback']);

  }
  setOrderAsDone(idRestau:any)
  {
    let x:any=['nermine'];
    this.restauService.setOrderAsDone(idRestau,this.idUser,x)
    //let y:string[]=x.get('id');
    //console.log(x)
  }

  finishedOrders:any=[];
  getFinishedOrders()
  {
    let order={}
    let ch=""
    this.restauService.getFinishedOrdersOfUser(this.idUser).snapshotChanges().subscribe
    (res=>{
      res.forEach(element => {
        
        //console.log(element.key) //:restaurant's key
        //console.log(element.payload.val())
        let e:any
        let x:any=element.payload.val()
        let y;
        for(e in x) //e: the key of a finished orders
        {     //console.log(x[e])
             order={}
             ch=""
              if(x[e].idUser==this.idUser)
              {
               
                for(y in x[e] )
                if(y !="idUser" && y!="status" && y!="feedback")
                  ch=ch+'\n'+y
                  //console.log(y)//y:name of dishs
                  order['key']=e;
                  order['idRestau']=element.key;
                  order['status']=x[e].status;
                  order['feedback']=x[e].feedback;
                  order['orders']=ch
                  this.getInfoRestau(element.key,order)
                  this.finishedOrders.push(order)
              }
            
              
        }
        //console.log(this.finishedOrders)

      });
    
    })
  }
}
