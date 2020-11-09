import { Component, OnInit } from '@angular/core';
import { BillService } from '../bill.service';
import { BillsFilterService } from '../../services/bills-filter.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {

  bills: any;
  billsFiltered: any;

  constructor(private billService: BillService, private billsFilterService: BillsFilterService) {}

	ngOnInit(): void {
		this.getBillsList();
    this.billsFilterService.filteredBills.subscribe(bills => {
      this.billsFiltered = bills
    });
	}

	getBillsList() {
		this.billService.getBillsList().snapshotChanges().pipe(
			map(changes =>
				changes.map(c =>
					({key: c.payload.key, ...c.payload.val()})
				)
			)
		).subscribe(bills => {
			this.bills = bills;
			this.billsFiltered = bills;
		});
	}

  onFilter(event) {
    const input = event.target.value;
    this.billsFilterService.filterBills(this.bills, input);
  }

}
