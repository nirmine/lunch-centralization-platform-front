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
  userName:any;
  ens:any={}
  order:any={}
 
 
  orders:any=[]
  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute) {
    if (!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') === 'true') {
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
    } else {
      localStorage.setItem('firstReload', 'true');
    }
    this.getAllRestaus();
   // console.log(sessionStorage.getItem('role'))
   this.idUser=sessionStorage.getItem('userId');
   this.userName=sessionStorage.getItem('name');
 // console.log(sessionStorage.getItem('name'))
  // console.log(this.idUser)
   this.restauService.getOrdersOfUser(this.idUser).snapshotChanges().subscribe(orders => {
    //console.log(orders[1].payload.val())
    this.orders=[]
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
        let total;
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
          //console.log(orderStatus)
        if(e==this.idUser)
        {
         for(el in this.ens[e])//this.ens[e]:the list of this user's orders//el:dish's names
         {  
           if(el != "status" && el!="total" && el!="note")
            {
             
               ch=ch+'\n '+this.ens[e][el]+' '+el
              
             }
             else
             if(el == "status")
              status=this.ens[e][el]
             else
             if(el=="total")
             total=this.ens[e][el]
          }
          
                //ch=ch+'\n '+this.ens[e][el]+' '+el
                liste.push(ch)
                liste.push(status)//the order status :it could be undefined
                ordersSet["orderList"]=ch;
                ordersSet["idRestau"]=element.key;
                if(orderStatus=="")
                ordersSet["status"]=status;
                else
                ordersSet["status"]=orderStatus;
              //  console.log(orderStatus)
                ordersSet["total"]=total;
                ordersSet["orderStatus"]=orderStatus;
                this.getInfoRestau(element.key,ordersSet)
                this.order[element.key]=liste;
                this.orders.push(ordersSet)
         }
          
        }

        //console.log(this.orders)//{restauKey:[dishs,status,restauName]}

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
          console.log(this.restausList[elt]['menu'])
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
      this.getOderToDeliver()
  }

  goToMenu(idRestau:any)
  {
    sessionStorage.setItem('restauId',idRestau);
    //console.log(idRestau)
   this.router.navigate(['RestauMenu']);
  }
  
  getInfoRestau(idRestau,ens:any)
  {
    this.restauService.getInfoRestaurantById(idRestau).snapshotChanges().subscribe(infos => {
     //console.log(infos[0].payload.val()['name'])
      //ens.push(infos[0].payload.val()['name'])
       ens["restauName"]=infos[0].payload.val()['name']
       ens["restauAddress"]=infos[0].payload.val()['address']
       ens["restauPhone"]=infos[0].payload.val()['phoneNumber']
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
    sessionStorage.setItem('userId',this.idUser);
    sessionStorage.setItem('restauId',idRestau);
    //console.log(idRestau)
    this.router.navigate(['validateOrder']);
  
  }
  giveFeedback(idRestau:any,idOrder:any)
  {
    sessionStorage.setItem('finishedOrderIdRestau',idRestau);
    sessionStorage.setItem('finishedOrderKey',idOrder);
   
    //console.log(idOrder)
    this.router.navigate(['feedback']);

  }
  setOrderAsDone(idRestau:any)
  {
  //  let x:any=['nermine'];
    this.restauService.setOrderAsDone(idRestau,this.idUser)
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
      this.finishedOrders=[]
      res.forEach(element => {
        
        //console.log(element.key) //:restaurant's key
        //console.log(element.payload.val())
        let e:any
        let x:any=element.payload.val()
        let y;
        let total
        for(e in x) //e: the key of a finished orders
        {     //console.log(x[e])
             order={}
             ch=""
              if(x[e].idUser==this.idUser)
              {
               
                for(y in x[e] )
                if(y !="idUser" && y!="status" && y!="feedback" && y!="note" && y!="total")
                  ch=ch+'\n'+y
                  else
                  {
                    if(y=="total")
                      total=x[e][y]
                  }
                  //console.log(y)//y:name of dishs
                  order['key']=e;
                  order['idRestau']=element.key;
                  order['status']=x[e].status;
                  order['total']=total;
                  order['feedback']=x[e].feedback;
                  order['orders']=ch
                  this.getInfoRestau(element.key,order)
                  this.finishedOrders.push(order)
              }
            
              
        }
     //   console.log(this.finishedOrders)

      });
    
    })
  }

  toDeliverOrder:any={}
  toDeliverOrdersByUser:any=[]
  toDeliverOrders:any=[]
  getOderToDeliver()
  {
   
      let ens:any={}
      this.restauService.getOrdersOfUser("1").snapshotChanges().subscribe(orders => {
        //console.log(orders[1].payload.val())
        this.toDeliverOrders=[]
          orders.forEach(element => {
            //console.log(element.key):restaurant key
            this.toDeliverOrder={}
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
               if(el != "status" && el!="total" && el!="note")
                {
                 
                   ch=ch+'\n '+ ens[e][el]+' '+el
                  
                 }
                 else
                
                  status=ens[e][el]
                 
              }
            
  
                   
                  
                    ordersSet["orderList"]=ch;
                   
                   this.getInfoUser(e,ordersSet)
                  
                    restauOrders.push(ordersSet)
                  
            }
            else{
              if(e=="status")
              this.toDeliverOrder["orderStatus"]=ens[e]
              else
               this.toDeliverOrder["orderDelivery"]=ens[e]
            }
              
            }
              this.toDeliverOrder["idRestau"]=element.key
              this.getInfoRestau(element.key,this.toDeliverOrder)
              this.toDeliverOrder["orders"]=restauOrders
              if((this.toDeliverOrder["orderStatus"]==null || this.toDeliverOrder["orderStatus"]==""))
                this.toDeliverOrders.push(this.toDeliverOrder)
    
          });
          //console.log(this.toDeliverOrders)//{restauKey:[dishs,status,restauName]}
  
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
volunteerForDelivery(idRestau:any)
{
this.restauService.setDelivery(idRestau,this.userName)

}
}
