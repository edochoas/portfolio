import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, CurrencyResponse, Transaction } from '../services/api.service';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.css',
})
export class ExchangeFormComponent implements OnInit {
  currencies: CurrencyResponse = [];
  convertedAmount = 0;
  transactions: Transaction[] = []
  firstCall = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies;
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const currency = event.target.currency.value;
    this.api.convert(amount, currency).subscribe((response) => {
      this.firstCall = false;
      this.convertedAmount = response.amount;
      this.transactions = response.path
    });
  }
}
