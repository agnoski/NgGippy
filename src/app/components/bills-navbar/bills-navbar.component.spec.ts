import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsNavbarComponent } from './bills-navbar.component';

describe('BillsNavbarComponent', () => {
  let component: BillsNavbarComponent;
  let fixture: ComponentFixture<BillsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
