import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  http = inject(HttpClient);

  title = 'Dating App';

  users: any;

  ngOnInit(): void {
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

}
