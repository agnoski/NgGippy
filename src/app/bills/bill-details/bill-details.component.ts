import { Component, OnInit, Input } from '@angular/core';
import { BillService } from '../bill.service';
import { Bill } from '../bill'

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

	@Input() bill: Bill;
	
	constructor(private billService: BillService) { }

	ngOnInit(): void {
	}

	updateBill(bill: Bill) {
		this.billService
		.updateBill(this.bill.key, bill)
		.catch(err => console.log(err));
	}

	deleteBill() {
		this.billService
		.deleteBill(this.bill.key)
		.catch(err => console.log(err));
	}

}
