import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { map } from 'rxjs/operators';

interface Summary {
	info: string,
	years: {
		[key: string]: {
			total: number,
			months: {
				[key: string]: {
					name: string,
					total: number,
					categories: {
						[key: string]: number 
					}
				}
			}
		}
	}
}

@Component({
  selector: 'app-bills-summary',
  templateUrl: './bills-summary.component.html',
  styleUrls: ['./bills-summary.component.css']
})
export class BillsSummaryComponent implements OnInit {

	summary: Summary;

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
			let tmpSummary = {
				info: "Here you can find the data summarized :)",
				years: {}
			};
			bills.forEach(bill => {
				const billDate = new Date(bill["date"]);
				const billDateFullYear = billDate.getFullYear();
				const billDateMonth = billDate.getMonth();
				const billDateMonthName = billDate.toLocaleString('default', { month: 'long' });
				const billAmount = Number(bill["amount"]);
				//TODO: refactor this if-else chain, maybe there is a smarter solution
				if(tmpSummary.years[billDateFullYear] === undefined) {
					tmpSummary.years[billDateFullYear] = {
						total: billAmount,
						months: {
							[billDateMonth]: {
								name: billDateMonthName,
								total: billAmount,
								categories: {
									[bill["category"]]: billAmount
								}
							}
						}
					};
				} else if(tmpSummary.years[billDateFullYear].months[billDateMonth] === undefined) {
					tmpSummary.years[billDateFullYear].total += billAmount;
					tmpSummary.years[billDateFullYear].months[billDateMonth] = {
						name: billDateMonthName,
						total: billAmount,
						categories: {
							[bill["category"]]: billAmount
						}
					};
				} else if(tmpSummary.years[billDateFullYear].months[billDateMonth].categories[bill["category"]] === undefined) {
					tmpSummary.years[billDateFullYear].total += billAmount;
					tmpSummary.years[billDateFullYear].months[billDateMonth].total += billAmount;
					tmpSummary.years[billDateFullYear].months[billDateMonth].categories[bill["category"]] = billAmount;
				}
				else {
					tmpSummary.years[billDateFullYear].total += billAmount;
					tmpSummary.years[billDateFullYear].months[billDateMonth].total += billAmount;
					tmpSummary.years[billDateFullYear].months[billDateMonth].categories[bill["category"]] += billAmount;				}
			});
			console.log(tmpSummary);
			this.summary = tmpSummary;
		});
	}

}
