import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Bill } from '../bill';
import { BillService } from '../bill.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  @Input() bill: Bill;

  billForm: FormGroup;

  constructor(private billService: BillService, private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.bill) {
      this.billForm = this.formBuilder.group({
        user: [this.bill.user, Validators.required],
        date: [this.bill.date, Validators.required],
        amount: [this.bill.amount, Validators.required],
        category: [this.bill.category, Validators.required],
        shop: [this.bill.shop, Validators.required],
        recurrent: [this.bill.recurrent, Validators.required],
      });
      console.log("Bill received from form onInit: ", this.bill);
    } else {
      this.billForm = this.formBuilder.group({
        user: [this.authService.getLoginData().user, Validators.required],
        date: [new Date().toISOString().substring(0,10), Validators.required],
        amount: ['', Validators.required],
        category: ['', Validators.required],
        shop: ['', Validators.required],
        recurrent: ['n', Validators.required],
      });
      console.log("Empty form");
    }
  }

  addBill(bill: Bill): void {
    this.billService.addBill(bill);
  }

  updateBill(key: string, bill: Bill): void {
    this.billService.updateBill(key, bill);
  }

  resetForm(): void {
    this.billForm.reset();
  }

  onSubmit(formData) {
    const bill: Bill = Object.assign(new Bill(), formData)
    console.log(bill);
    if(this.bill) {
      this.updateBill(this.bill.key, bill);
    } else {
      this.addBill(bill);
    }
  }

}
