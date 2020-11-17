import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillService } from './../../services/bill/bill.service';
import { Bill } from './../../classes/bill/bill'

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

	@Input() bill: Bill;
	
	constructor(private billService: BillService, private modalService: NgbModal) { }

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

  openEditModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
      .then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
      console.log(`Closed with: ${reason}`);
    });
  }

}
