import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export class NavbarVars {
  backRoute: string[];
  title: string;
  params: {};
}

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  vars: NavbarVars;

  constructor() { 
    this.vars = new NavbarVars();
  }

  get(): Observable<NavbarVars> {
    return of(this.vars);
  }

  set(backRoute: string[], title: string, params: {} = null) {
    this.vars.backRoute = backRoute;
    this.vars.title = title;
    this.vars.params = params;
  }
}
