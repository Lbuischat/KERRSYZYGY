import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FocusMode } from './focus-mode';

describe('FocusMode', () => {
  let component: FocusMode;
  let fixture: ComponentFixture<FocusMode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FocusMode],
    }).compileComponents();

    fixture = TestBed.createComponent(FocusMode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
