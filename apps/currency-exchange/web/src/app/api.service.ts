import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Transaction = {
  previousAmount: number;
  previousCurrency: number;
  currencyCode: string;
  exchangeRate: number;
  convertedAmount: number;
}

type ConvertResponse = {
  amount: number;
  path: Transaction[];
};
interface Currency {
  currencyName: string;
  currencyCode: string;
}

export type CurrencyResponse = Currency[];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  basePath = 'currency-exchange-api';

  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<CurrencyResponse>(`/${this.basePath}/currencies`);
  }

  convert(amount: number, currency: string): Observable<ConvertResponse> {
    return this.http.get<ConvertResponse>(
      `/${this.basePath}/convert?amount=${amount}&currency=${currency}`
    );
  }
}
