import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, CurrencyResponse } from './api.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements OnInit {
  currencies: CurrencyResponse = [];
  convertedAmount = 0;
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
    });
  }
}
