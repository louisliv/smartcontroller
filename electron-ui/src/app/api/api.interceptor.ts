import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private router: Router, private cookieService: CookieService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const csrfToken = this.cookieService.get('csrftoken');
        
        if (csrfToken) {
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    'X-CSRFToken': csrfToken
                }
            })
        }
        return next.handle(request);
    }
}
