import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bill } from '../bill';
import { BillService } from '../bill.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

	bill: Bill = new Bill();
	submitted = false;

	constructor(private billService: BillService) { }

	ngOnInit(): void {
	}

	newBill(): void {
		this.submitted = false;
		this.bill = new Bill();
	}

	addBill(): void {
		this.billService.addBill(this.bill);
		this.bill = new Bill();
	}

	onSubmit() {
		this.submitted = true;
		this.addBill();
	}

}
