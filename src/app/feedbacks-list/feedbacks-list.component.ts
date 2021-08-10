import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-feedbacks-list',
  templateUrl: './feedbacks-list.component.html',
  styleUrls: ['./feedbacks-list.component.css']
})
export class FeedbacksListComponent implements OnInit {

  constructor(private restauService:RestaurantService,private router : Router, private route: ActivatedRoute) 
  {

this.idUser=sessionStorage.getItem('userId');
    this.restauService.getFeedbacksOfRestau(this.idUser).snapshotChanges().subscribe(res=>{
     // console.log(res)
     this.finishedOrders=[]
      let ens:any=res[0].payload.val()
      let elt:any
      let ch=""
    let i:any
      for(i in ens)//i:the key
      {
        for(elt in ens[i])
        {
          if(elt!="feedback" && elt!="idUser" && elt!="note" && elt!="status"&& elt!="total")
         {
           if(ch!="")
          ch=ch+'/'+elt
          else
          ch=ch+elt

         } 
       //   console.log(ch)
        }
        //console.log(ens[i]['feedback'])//set that represents an order
        if(ens[i]['feedback']!=null && ens[i]['feedback']!=undefined )
        {
          ens[i]['orders']=ch
          this.finishedOrders.push(ens[i])
        }
      }

  })
console.log(this.finishedOrders)
   }

   finishedOrders=[];
   idUser:any;
  ngOnInit(): void {
  }

}
