import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Currency, Transaction } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

class Operation {
  constructor(public amount: number | null =  null, public currency = '') {}
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
    this.api.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
      if (currencies.length > 0) {
        const [firstCurrency] = currencies;
        this.operation.currency = firstCurrency.currencyCode;
        this.selectedCurrency = firstCurrency.currencyName;
      }
    });
    this.searchSubject.pipe(debounceTime(500)).subscribe(() => {
      this.makeConversion()
    });
  }

  onInput() {
    if (this.submitted) {
      this.searchSubject.next(this.operation.amount || 0);
    }
  }

  onCurrencyChange() {
    this.makeConversion()
  }

  updateSelectedCurrency() {
    const selectedCurrency = this.currencies.find(
      (currency) => currency.currencyCode === this.operation.currency
    );
    this.selectedCurrency = selectedCurrency
      ? selectedCurrency.currencyName
      : ''; 
  }

  makeConversion() {
    const { currency, amount } = this.operation
    if (currency && amount) {
      this.api.convert(amount, currency).subscribe((response) => {
        this.submitted = true;
        this.convertedAmount = response.amount;
        this.transactions = response.path;
        this.updateSelectedCurrency();
      });
    }
    
  }
}
