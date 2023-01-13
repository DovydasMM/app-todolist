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
  constructor(private authService: AuthService) {}
  isLoginMode = true;
  isLoading = false;
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
      authObs = this.authService.logIn(email, password);
    }
    if (!this.isLoginMode) {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.authService.loggedIn();
      },
      (errorRes) => {
        this.isLoading = false;
        this.errorMessage = errorRes;
      }
    );

    form.reset();
  }
}