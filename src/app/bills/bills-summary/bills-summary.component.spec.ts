import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsSummaryComponent } from './bills-summary.component';

describe('BillsSummaryComponent', () => {
  let component: BillsSummaryComponent;
  let fixture: ComponentFixture<BillsSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
