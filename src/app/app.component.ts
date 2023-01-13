import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = "TodoList App";
  menuOpen = true;
  darkMode: boolean = false;

  toggleMenu() {
    this.menuOpen = this.menuOpen ? false : true;
  }

  onToggleMode() {
    this.router.navigate(["/auth"]);
    // this.darkMode = this.darkMode ? false : true;
  }
}
