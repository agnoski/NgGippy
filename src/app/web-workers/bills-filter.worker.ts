/// <reference lib="webworker" />
import { BillsFilter } from '../classes/bills-filter/bills-filter'

const billsFilter = new BillsFilter();

addEventListener('message', ({ data }) => {
  const billsLocal = billsFilter.filter(data.str, data.bills);
  postMessage(billsLocal);
});
