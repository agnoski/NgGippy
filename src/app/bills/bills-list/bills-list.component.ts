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
  funcList: any;

	constructor(private billService: BillService) {
    this.funcList = {
      "@": (bill, user) => bill.user === user,
      "#": (bill, category) => bill.category === category,
      ":": (bill, shop) => bill.shop === shop,
      "/": (bill, date) => bill.date === date
    }
  }

	ngOnInit(): void {
		this.getBillsList();
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

    // parse space
    const tokens = str.split(" ");

    // take first caracter
    // map to a list of filter functions
    const filtFun = tokens.filter(token => token.length > 1).map(token => {
      return {func: this.funcList[token[0]], arg: token.slice(1)};
    });

    // apply filters
    let billsLocal = this.bills.filter(bill => true); // copy
    filtFun.forEach(filt => {
      if(filt.func) {
        billsLocal = billsLocal.filter(bill => filt.func(bill, filt.arg)); 
      }
    });

    this.billsFiltered = billsLocal;
  }

}
