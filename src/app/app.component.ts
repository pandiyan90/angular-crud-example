import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DataSource } from "@angular/cdk/collections";
import { UserService } from './services/user.service';
import { User } from './models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from "@angular/material/dialog";
import { AddComponent } from './dialogs/add/add.component';
import { EditComponent } from "./dialogs/edit/edit.component";
import { DeleteComponent } from "./dialogs/delete/delete.component";
import { MatSort } from '@angular/material/sort';
import { fromEvent } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-crud-example';

  displayedColumns = ['id', 'username', 'firstname', 'lastname', 'email', 'mobile', 'actions'];
  dataSource: MatTableDataSource<User[]>;
  dataSourceLength: Number;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    console.log('add clicked');
    const dialogRef = this.dialog.open(AddComponent, {
      data: {user: User}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    });
    
  }

  public loadData() {
    this.userService.getAllUsers().subscribe((result: any) => {
        this.dataSource = new MatTableDataSource(result.payload);
        this.dataSource.sort = this.sort;
        this.dataSourceLength = result.page.total;
        fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
          this.dataSource.filter = this.filter.nativeElement.value;
        })
      },
      (error: HttpErrorResponse) => {
          console.error(error);
      });
  }

  edit(user: User) {
    console.log('edit clicked. '+ JSON.stringify(user));
    const dialogRef = this.dialog.open(EditComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    })
  }

  delete(user: User) {
    console.log('delete clicked');
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1) {
        this.loadData();
      }
    })
  }

}
