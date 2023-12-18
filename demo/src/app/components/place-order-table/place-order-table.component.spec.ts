import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderTableComponent } from './place-order-table.component';

describe('PlaceOrderTableComponent', () => {
  let component: PlaceOrderTableComponent;
  let fixture: ComponentFixture<PlaceOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceOrderTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaceOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
