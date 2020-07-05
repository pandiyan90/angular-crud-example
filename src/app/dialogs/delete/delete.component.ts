import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,
    private userService: UserService
  ) { }

  delete(id: Number) {
    this.userService.deleteUserById(id).subscribe(result => {
      console.log(JSON.stringify(result));
      
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
