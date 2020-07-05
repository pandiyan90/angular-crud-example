import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  constructor(
    private dialofRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) { }

  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  submit() {
    
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required Field' :
      this.formControl.hasError('email') ? 'Enter a valid email' :
      '';
  }

  update() {
    this.userService.updteUser(this.user).subscribe(result => {
      console.log(JSON.stringify(result));
    })
  }

  cancel() {
    this.dialofRef.close();
  }

}
