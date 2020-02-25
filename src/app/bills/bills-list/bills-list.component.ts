import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {

	bills: any;

	constructor(private billService: BillService) { }

	ngOnInit(): void {
		this.getBillsList();
	}

	getBillsList() {
		this.billService.getBillsList().snapshot().pipe(
			map(changes =>
				changes.map(c =>
					({key: c.payload.key, ...c.payload.val()})
				)
			)
		).subscribe(bills => {
			this.bills = bills;
		});
	}
	
}
