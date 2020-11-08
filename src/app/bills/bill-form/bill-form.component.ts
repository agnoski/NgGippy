import { Component, OnInit } from '@angular/core';
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

  billForm: FormGroup;

  constructor(private billService: BillService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.billForm = this.formBuilder.group({
      user: [this.authService.getLoginData().user, Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      category: ['', Validators.required],
      shop: ['', Validators.required],
      recurrent: ['n', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addBill(bill: Bill): void {
    this.billService.addBill(bill);
  }

  resetForm(): void {
    this.billForm.reset();
  }

  onSubmit(formData) {
    const bill: Bill = Object.assign(new Bill(), formData)
    console.log(bill);
    this.addBill(bill);
  }

}
