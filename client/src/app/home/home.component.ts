import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  registerMode = false;
  private http = inject(HttpClient);

  users: any;
  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get(`https://localhost:5265/api/users`).subscribe({
      next: (data) => {
        console.log(data)
        this.users = data;
      },
      error: (err) => {
        console.error(err)
      },
      complete: () => console.log('Request has been completed')
    })
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
