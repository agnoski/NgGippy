import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bills-summary',
  templateUrl: './bills-summary.component.html',
  styleUrls: ['./bills-summary.component.css']
})
export class BillsSummaryComponent implements OnInit {

	summary: any;

	constructor(private billService: BillService) { }

	ngOnInit(): void {
		this.getSummary();
	}

	getSummary() {
		this.billService.getBillsList().snapshotChanges().pipe(
			map(changes =>
				changes.map(c =>
					({key: c.payload.key, ...c.payload.val()})
				)
			)
		).subscribe(bills => {
			var monthsMap = {}
			bills.forEach(bill => {
			//var bill = billObject.val();
			var billDate = new Date(bill["date"]);
			var billDateFullYear = billDate.getFullYear();
			var billDateMonth = billDate.getMonth();
			var billAmount = Number(bill["amount"]);
			//TODO: refactor this if-else chain, maybe there is a smarter solution
			if(monthsMap[billDateFullYear] === undefined) {
				monthsMap[billDateFullYear] = [];
				monthsMap[billDateFullYear][billDateMonth] = {};
				monthsMap[billDateFullYear][billDateMonth][bill["category"]] = billAmount;
			} else if(monthsMap[billDateFullYear][billDateMonth] === undefined) {
				monthsMap[billDateFullYear][billDateMonth] = {};
				monthsMap[billDateFullYear][billDateMonth][bill["category"]] = billAmount;
			} else if(monthsMap[billDateFullYear][billDateMonth][bill["category"]] === undefined) {
				monthsMap[billDateFullYear][billDateMonth][bill["category"]] = billAmount;
			}
			else {
				monthsMap[billDateFullYear][billDateMonth][bill["category"]] += billAmount;
			}
		})
		console.log(monthsMap);
			this.summary = monthsMap;
		});
	}

}
