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
				const billAmount = Number(bill["amount"]);
				//TODO: refactor this if-else chain, maybe there is a smarter solution
				if(tmpSummary.years[billDateFullYear] === undefined) {
					tmpSummary.years[billDateFullYear] = {
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
				} else if(tmpSummary.years[billDateFullYear].months[billDateMonth] === undefined) {
					tmpSummary.years[billDateFullYear].total += billAmount;
					tmpSummary.years[billDateFullYear].months[billDateMonth] = {
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
			this.summary = this.roundAmounts(tmpSummary);
		});
	}

	roundAmounts(summary: Summary) {
		for(const year in summary.years) {
			summary.years[year].total = Number(summary.years[year].total.toFixed(2));
			for(const month in summary.years[year].months) {
				summary.years[year].months[month].total = Number(summary.years[year].months[month].total.toFixed(2));
				for(const category in summary.years[year].months[month].categories) {
					let categoryRoundAmount = Number(summary.years[year].months[month].categories[category].toFixed(2));
					summary.years[year].months[month].categories[category]  = categoryRoundAmount;
				}
			}
		}
		return summary;
	}

}
