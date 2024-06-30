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
export interface Currency {
  currencyName: string;
  currencyCode: string;
}


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  basePath = 'currency-exchange-api';

  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<Currency[]>(`/${this.basePath}/currencies`);
  }

  convert(amount: number, currency: string): Observable<ConvertResponse> {
    return this.http.get<ConvertResponse>(
      `/${this.basePath}/convert?amount=${amount}&currency=${currency}`
    );
  }
}
