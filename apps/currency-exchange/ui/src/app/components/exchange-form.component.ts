import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Currency, Transaction } from '../services/api.service';
import { FormsModule } from '@angular/forms';

class Operation {
  constructor(public amount?: number, public currency?: string) {}
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

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
      if (currencies.length > 0) {
        this.operation.currency = currencies[0].currencyCode;
        this.selectedCurrency = currencies[0].currencyName;
      }
    });
  }

  onCurrencyChange() {
    const selectedCurrency = this.currencies.find(
      (currency) => currency.currencyCode === this.operation.currency
    );
    this.selectedCurrency = selectedCurrency
      ? selectedCurrency.currencyName
      : '';
  }

  onSubmit() {
    const amount = this.operation.amount || 0.0;
    const currency = this.operation.currency || '';
    this.api.convert(amount, currency).subscribe((response) => {
      this.submitted = true;
      this.convertedAmount = response.amount;
      this.transactions = response.path;
    });
  }
}
