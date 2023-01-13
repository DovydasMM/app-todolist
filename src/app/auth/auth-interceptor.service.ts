import { Injectable } from "@angular/core";

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { exhaustMap, Observable, take, pipe, map } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    console.log(next);
    return this.authService.user.pipe(
      exhaustMap((user) => {
        if (!user) {
          console.log("ehehe");
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        console.log("hahaaah");
        return next.handle(modifiedReq);
      })
    );
  }
}
