import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsHomeComponent } from './bills-home.component';

describe('BillsHomeComponent', () => {
  let component: BillsHomeComponent;
  let fixture: ComponentFixture<BillsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
