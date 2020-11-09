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
  billsFiltered: any;
  webWorker: Worker;

  constructor(private billService: BillService) {}

	ngOnInit(): void {
		this.getBillsList();
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.webWorker = new Worker('../../web-workers/bills-filter.worker', { type: 'module' });
      this.webWorker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
        this.billsFiltered = data;
      };
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log("Web workers not supported...");
    }

	}

  ngOnDestroy() {
    this.webWorker.terminate();
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
    const str = event.target.value;
    console.log(str);
    this.webWorker.postMessage({str: str, bills: this.bills});
  }

}
