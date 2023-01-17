import { Router } from "@angular/router";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subject } from "rxjs";
import { AuthResponseData, AuthService } from "../auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  isLoginMode = true;
  isLoading = false;
  isLoggedIn = false;
  loggedIn = new Subject<boolean>();
  errorMessage: string;

  onModeChange() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    error: String;

    if (this.isLoginMode) {
      this.authService.isLoading.next(true);
      authObs = this.authService.logIn(email, password);
    }
    if (!this.isLoginMode) {
      this.authService.isLoading.next(true);
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (responseData) => {
        if (!this.isLoggedIn) {
          this.authService.loggedIn();
          this.isLoggedIn = true;
        }
      },
      (errorRes) => {
        this.authService.isLoading.next(false);
        this.isLoading = false;
        this.errorMessage = errorRes;
      }
    );

    form.reset();
  }
}
