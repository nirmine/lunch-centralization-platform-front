import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackService {
backUrl='/api'
  constructor(private http: HttpClient) { 

  }
  getPWDValidationStatus():any
  {
    return this.http.get('http://localhost:3080'+this.backUrl+'/pwdValidationStatus')
  }
}
