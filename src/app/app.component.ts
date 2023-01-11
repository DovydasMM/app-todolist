import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TodoList App';
  menuOpen = true;
  darkMode: boolean = false;

  toggleMenu() {
    this.menuOpen = this.menuOpen ? false : true;
  }

  onToggleMode() {
    this.darkMode = this.darkMode ? false : true;
  }
}
