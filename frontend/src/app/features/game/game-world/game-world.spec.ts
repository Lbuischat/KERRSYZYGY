import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameWorld } from './game-world';

describe('GameWorld', () => {
  let component: GameWorld;
  let fixture: ComponentFixture<GameWorld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameWorld],
    }).compileComponents();

    fixture = TestBed.createComponent(GameWorld);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
