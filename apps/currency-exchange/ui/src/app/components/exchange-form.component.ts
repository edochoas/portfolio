import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApiService,
  Conversion,
  Currency,
  Transaction,
} from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

class Operation {
  constructor(public amount: number | null = null, public currency = '') {}
}

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.css',
})
export class ExchangeFormComponent implements OnInit {
  currencies: Currency[] = [];
  convertedAmount = 0;
  transactions: Transaction[] = [];
  submitted = false;
  operation = new Operation();
  selectedCurrency = '';
  searchSubject = new Subject<number>();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadCurrencies();
    this.setupSearchSubscription();
  }

  private loadCurrencies() {
    this.api.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
      if (currencies.length > 0) {
        this.setInitialCurrency(currencies[0]);
      }
    });
  }

  private setInitialCurrency(currency: Currency) {
    this.operation.currency = currency.currencyCode;
    this.selectedCurrency = currency.currencyName;
  }

  private setupSearchSubscription() {

    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.makeConversion();
    });
  }

  makeConversion() {
    const { currency, amount } = this.operation;
    if (currency && amount) {
      this.api.convert(amount, currency).subscribe((conversion) => {
        this.handleConversionResponse(conversion);
      });
    }
  }

  private handleConversionResponse(conversion: Conversion) {
    this.submitted = true;
    this.convertedAmount = conversion.amount;
    this.transactions = conversion.path;
    this.updateSelectedCurrency();
  }

  private updateSelectedCurrency() {
    const selectedCurrency = this.currencies.find(
      (currency) => currency.currencyCode === this.operation.currency
    );
    this.selectedCurrency = selectedCurrency
      ? selectedCurrency.currencyName
      : '';
  }

  onCurrencyChange() {
    this.makeConversion();
  }

  onInput() {
    if (this.submitted) {
      this.searchSubject.next(this.operation.amount || 0);
    }
  }
}
