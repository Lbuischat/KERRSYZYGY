import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopButton } from './shop-button';

describe('ShopButton', () => {
  let component: ShopButton;
  let fixture: ComponentFixture<ShopButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
