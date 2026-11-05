import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewQuest } from './new-quest';

describe('NewQuest', () => {
  let component: NewQuest;
  let fixture: ComponentFixture<NewQuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewQuest],
    }).compileComponents();

    fixture = TestBed.createComponent(NewQuest);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
