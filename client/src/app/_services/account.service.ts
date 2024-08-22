import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginModel } from '../nav/models/login.model';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http = inject(HttpClient)
  #baseUrl = 'https://localhost:5265/api/';
  currentUser = signal<User | null>(null)

  login(model: LoginModel) {
    return this.http.post<User>(`${this.#baseUrl}account/login`, model).pipe(
      map(user => {
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user)
        }
        return user;
      })
    );
  }

  logout() {
    sessionStorage.removeItem('user');
    this.currentUser.set(null)
  }

  register(model: LoginModel) {
    return this.http.post<User>(`${this.#baseUrl}account/register`, model).pipe(
      map(user => {
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user)
        }
        return user;
      })
    );
  }

}
