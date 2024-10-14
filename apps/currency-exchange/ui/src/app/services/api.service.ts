import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';



export type Conversion = {
  amount: number;
  path: Transaction[];
};

export type Transaction = {
  previousAmount: number;
  previousCurrency: number;
  currencyCode: string;
  exchangeRate: number;
  convertedAmount: number;
};
export interface Currency {
  currencyName: string;
  currencyCode: string;
}

export const DEFAULT_ERROR = 'An error occurred; please try again later.';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  basePath = 'currency-exchange-api';

  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http
      .get<Currency[]>(`/${this.basePath}/currencies`)
      .pipe(catchError(this.handleError));
  }

  convert(amount: number, currency: string): Observable<Conversion> {
    return this.http.get<Conversion>(
      `/${this.basePath}/convert?amount=${amount}&currency=${currency}`
    ).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(
      () => new Error(DEFAULT_ERROR)
    );
  }
}
