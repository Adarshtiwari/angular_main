import { HttpClient } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Component, OnInit } from '@angular/core';
import { CountsService } from './counts.service'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { DialogComponent } from './dialog/dialog.component';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit {
  title = 'pratice';
  displayedColumns: string[] = ["id", 'productName', 'price', 'freshness', 'comment', "category", "action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(service: CountsService, private dialog: MatDialog, private api: ApiService) {
    localStorage.setItem("login", "false")
  }

  Allproduct: any
  getdata: any
  ngOnInit(): void {
    this.Allproduct = this.getAllProduct();
    this.api.notificationsubject.subscribe(da => {
      this.getdata = da
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%'
    }).afterClosed().subscribe(val => {
      console.log("the value is ", val)
      if (val == 'Save') {
        this.getAllProduct()

      }
    })


  }

  getAllProduct() {

    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort;
        return res
      },
      error: () => {
        alert("getting error in get product")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%',
      data: row
    }).afterClosed().subscribe(val => {
      console.log("the value is ", val)
      if (val == "edit") {
        this.getAllProduct()
      }
    })
  }

  deleteProduct(row: any) {
    this.api.deleteProduct(row.id).subscribe({
      next: (value) => {
        alert(" delete the item")
        this.getAllProduct()
      },
      error: (err) => {
        alert("error in deleting")

      }
    })
  }

}
