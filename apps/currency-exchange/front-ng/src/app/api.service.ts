import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type ConvertResponse = {
  amount: number
  path: Array<{ currencyCode: string, exchangeRate: number, convertedAmount: number }>
}
interface Currency  {
  currencyName: string;
  currencyCode: string;
}

export type CurrencyResponse = Currency[];

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  basePath = 'currency-exchange-api';

  constructor(private http: HttpClient) { }

  getCurrencies() {
    return this.http.get<CurrencyResponse>(`/${this.basePath}/currencies`);
  }

  convert(amount: number, currency: string) : Observable<ConvertResponse> {
    return this.http.get<ConvertResponse>(`/${this.basePath}/convert?amount=${amount}&currency=${currency}`)
  }
}
