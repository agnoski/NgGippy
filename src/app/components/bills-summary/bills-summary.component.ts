import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { BillService } from './../../services/bill/bill.service';
import { BillsFilterService } from './../../services/bills-filter/bills-filter.service';
import { Summary } from './../../interfaces/summary';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bills-summary',
  templateUrl: './bills-summary.component.html',
  styleUrls: ['./bills-summary.component.css']
})
export class BillsSummaryComponent implements OnInit {

	summary: Summary;
  bills: any[];

	constructor(private billService: BillService, private billsFilterService: BillsFilterService) { }

	ngOnInit(): void {
		this.getSummary();
    this.billsFilterService.filteredBills.subscribe(bills => {
      this.setSummary(bills);
    });
	}

	getSummary() {
		this.billService.getBillsList().snapshotChanges().pipe(
			map(changes =>
				changes.map(c =>
					({key: c.payload.key, ...c.payload.val()})
				)
			)
		).subscribe(bills => {
      this.bills = bills;
      this.setSummary(bills);
		});
	}

  setSummary(bills): void {
    const tmpSummary = {
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

    this.summary = tmpSummary;
  }

  onFilter(event) {
    const input = event.target.value;
    this.billsFilterService.filterBills(this.bills, input);
  }

  desc(a: KeyValue<number, any>, b: KeyValue<number, any>): number {
    return b.key - a.key;
  }

}
