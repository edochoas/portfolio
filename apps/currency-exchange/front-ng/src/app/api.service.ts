import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http.get('/currency-exchange-api/currencies').pipe(
      //tap(currencies => console.log(currencies))
    );
  }
}
