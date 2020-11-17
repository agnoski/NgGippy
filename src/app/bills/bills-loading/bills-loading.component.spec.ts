import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsLoadingComponent } from './bills-loading.component';

describe('BillsLoadingComponent', () => {
  let component: BillsLoadingComponent;
  let fixture: ComponentFixture<BillsLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
