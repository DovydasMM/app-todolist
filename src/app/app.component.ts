import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";
import { ProjectsService } from "./services/projects.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(
    private projectService: ProjectsService,
    private router: Router,
    private authService: AuthService
  ) {}

  title = "TodoList App";
  menuOpen = true;
  darkMode: boolean = false;
  isLoggedIn: boolean = false;

  toggleMenu() {
    this.menuOpen = this.menuOpen ? false : true;
  }

  toggleLog() {
    if (!this.isLoggedIn) {
      this.router.navigate(["/auth"]);
    }
    if (this.isLoggedIn) {
      this.authService.logOut();
      this.projectService.clearProjects();
      this.router.navigate(["/all"]);
    }
  }
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((responseData) => {
      if (responseData) {
        this.isLoggedIn = true;
        this.projectService.importProject();
      }
      if (!responseData) {
        this.isLoggedIn = false;
      }
    });
    this.router.navigate(["/all"]);
  }
}
