import { Component, EventEmitter, inject, input, Input, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private accountService = inject(AccountService)
  private toastr = inject(ToastrService)
  // @Input() usersFromHomeComponent: any;

  //below is only after Angular 17
  // usersFromHomeComponent = input.required<any>()

  //  // before angular 17, below is child to parent communication
  //  @Output() cancelRegister = new EventEmitter();

  //below is only after Angular 17
  cancelRegister = output<boolean>()


  model: any = {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: (data) => {
        this.toastr.info('User registered successfully!!')
        this.cancel();
      },
      error: (err) => {
        this.toastr.error(err.error)
      }
    })
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false)
  }
}
