import { ApiService } from './../services/api.service';
import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productform !: FormGroup
  freshnesslist = ["Brand new", "Second hand", "Refurbished"]
  actionBtn = "Save"
  constructor(private formbuilder: FormBuilder, private api: ApiService,
    private dialogref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {

  }

  ngOnInit(): void {
    this.productform = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      // date: ['', Validators.required],
    })

    console.log(this.editData)
    if (this.editData) {
      this.actionBtn = "edit"
      this.productform.controls['productName'].setValue(this.editData.productName)
      this.productform.controls['category'].setValue(this.editData.category)
      this.productform.controls['freshness'].setValue(this.editData.freshness)
      this.productform.controls['price'].setValue(this.editData.price)
      this.productform.controls['comment'].setValue(this.editData.comment)
    }
  }

  addProduct() {
    console.log("form valid", this.productform)
    if (this.productform.valid) {
      console.log("form valid")
      if (this.actionBtn == "Save") {
        this.api.postProduct(this.productform.value).subscribe({
          next: (res) => {
            alert("product add ")
            this.productform.reset();
            this.dialogref.close("Save");
          },
          error: () => {
            alert("error in adding product")
          }
        })
      }
      else {
        this.api.patchProduct(this.productform.value, this.editData.id).subscribe({
          next: (res) => {
            alert("product updated ")
            this.productform.reset();
            this.dialogref.close('edit');
          },
          error: () => {
            alert("error in updatng product")
          }
        })
      }
    }
  }

  refresh(index: number, freshnesslist: any) {
    return freshnesslist.productName
  }
}
