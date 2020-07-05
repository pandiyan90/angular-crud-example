import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) { }

  formControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : 
      this.formControl.hasError('email') ? 'Not a valid email':
      '';
  }

  submit() {

  }

  public save(): void {
    console.log(JSON.stringify(this.user));

    this.userService.addUser(this.user).subscribe(result => {
      console.log(JSON.stringify(result));
      
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
