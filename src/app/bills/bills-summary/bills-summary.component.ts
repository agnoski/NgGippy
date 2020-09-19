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
			let monthsMap = {
				summaryInfo: "Here you can find the data summarized :)",
				years: {}
			};
			bills.forEach(bill => {
				const billDate = new Date(bill["date"]);
				const billDateFullYear = billDate.getFullYear();
				const billDateMonth = billDate.getMonth();
				const billAmount = Number(bill["amount"]);
				//TODO: refactor this if-else chain, maybe there is a smarter solution
				if(monthsMap.years[billDateFullYear] === undefined) {
					monthsMap.years[billDateFullYear] = {
						total: billAmount,
						months: {
							[billDateMonth]: {
								total: billAmount,
								categories: {
									[bill["category"]]: billAmount
								}
							}
						}
					};
				} else if(monthsMap.years[billDateFullYear].months[billDateMonth] === undefined) {
					monthsMap.years[billDateFullYear].total += billAmount;
					monthsMap.years[billDateFullYear].months[billDateMonth] = {
						total: billAmount,
						categories: {
							[bill["category"]]: billAmount
						}
					};
				} else if(monthsMap.years[billDateFullYear].months[billDateMonth].categories[bill["category"]] === undefined) {
					monthsMap.years[billDateFullYear].total += billAmount;
					monthsMap.years[billDateFullYear].months[billDateMonth].total += billAmount;
					monthsMap.years[billDateFullYear].months[billDateMonth].categories[bill["category"]] = billAmount;
				}
				else {
					monthsMap.years[billDateFullYear].total += billAmount;
					monthsMap.years[billDateFullYear].months[billDateMonth].total += billAmount;
					monthsMap.years[billDateFullYear].months[billDateMonth].categories[bill["category"]] += billAmount;				}
			});
			console.log(monthsMap);
			this.summary = monthsMap; //this.roundAmounts(monthsMap);
		});
	}
/*
	roundAmounts(summary: object) {
		Object.keys(summary).forEach(year => {
			Object.keys(summary[year]).forEach((month, monthIdx) => {
				Object.keys(summary[year][monthIdx]).forEach(category => {
					summary[year][monthIdx][category] = summary[year][monthIdx][category].toFixed(2);
				});
			});
		};
		return summary;
	}
*/
}
