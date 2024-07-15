import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isCollapsed = true;

  openMenu() {
    this.isCollapsed = false;
  } 

  closeMenu() {
    this.isCollapsed = true;
  }
}
