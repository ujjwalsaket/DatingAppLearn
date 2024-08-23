import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-errors',
  standalone: true,
  imports: [],
  templateUrl: './test-errors.component.html',
  styleUrl: './test-errors.component.scss'
})
export class TestErrorsComponent {

  private httpClient = inject(HttpClient);
  baseUrl = environment.apiUrl;

  validationErrors: string[] = [];

  get400Error() {
    this.httpClient.get(`${this.baseUrl}buggy/bad-request`).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => console.error(err)
    })
  }

  get401Error() {
    this.httpClient.get(`${this.baseUrl}buggy/auth`).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => console.error(err)
    })
  }

  get404Error() {
    this.httpClient.get(`${this.baseUrl}buggy/not-found`).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => console.error(err)
    })
  }

  get500Error() {
    this.httpClient.get(`${this.baseUrl}buggy/server-error`).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => console.error(err)
    })
  }

  get400ValidationError() {
    this.httpClient.post(`${this.baseUrl}account/register`, {}).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.error(err);
        this.validationErrors = err;
      }
    })
  }
}
