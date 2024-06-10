import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent implements OnInit {
  currencies: any;
  selectedCurrency = "";
  amount = 0;
  
  constructor(private api: ApiService) {} 

  ngOnInit(): void {
    this.api.getCurrencies().subscribe((currencies) => {
      this.currencies = currencies
    })
  }

  onSubmit() {
  }
}
