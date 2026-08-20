import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrencyDisplay } from './currency-display';

describe('CurrencyDisplay', () => {
  let component: CurrencyDisplay;
  let fixture: ComponentFixture<CurrencyDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
