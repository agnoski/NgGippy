import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Bill } from './../../components/bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {
	private dbPath = '/gippy/bills';

	billsRef : AngularFireList<Bill> = null;
	
	constructor(private db: AngularFireDatabase) {
 		this.billsRef = db.list(this.dbPath, ref => ref.orderByChild('date'));
	}

	addBill(bill: Bill): void {
		this.billsRef.push(bill);
	}

	updateBill(key: string, value: any): Promise<void> {
		return this.billsRef.update(key, value);
	}

	deleteBill(key: string): Promise<void> {
		return this.billsRef.remove(key);
	}

	getBillsList(): AngularFireList<Bill> {
		return this.billsRef;
	}
}
