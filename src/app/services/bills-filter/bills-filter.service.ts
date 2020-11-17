import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillsFilterService {
 
  webWorker: Worker;
  filteredBills: Subject<any[]>;

  constructor() {
    this.filteredBills = new Subject<any[]>();
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.webWorker = new Worker('../../web-workers/bills-filter.worker', { type: 'module' });
      this.webWorker.onmessage = ({ data }) => {
        this.filteredBills.next(data);
      };
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log("Web workers not supported...");
    }
  }

  filterBills(bills: any[], input: string): void {
    this.webWorker.postMessage({str: input, bills: bills});
  }
}
