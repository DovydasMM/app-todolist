import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  title = "TodoList App";
  menuOpen = true;
  darkMode: boolean = false;
  isLoggedIn: boolean = false;

  toggleMenu() {
    this.menuOpen = this.menuOpen ? false : true;
  }

  onToggleMode() {
    this.router.navigate(["/auth"]);
    // this.darkMode = this.darkMode ? false : true;
  }
  ngOnInit(): void {
    console.log(this.isLoggedIn);
    this.authService.isLoggedIn.subscribe((resData) => {
      console.log(resData);
      this.isLoggedIn = resData;
    });
  }
}
