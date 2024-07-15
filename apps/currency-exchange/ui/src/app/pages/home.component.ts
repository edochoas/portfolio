import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeFormComponent } from '../components/exchange-form.component';
import { HeaderComponent } from "../components/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ExchangeFormComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

}
