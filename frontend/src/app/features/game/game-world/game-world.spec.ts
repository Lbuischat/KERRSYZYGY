import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameWorld } from './game-world';
import { Terrain } from './terrain/terrain';
import { TERRAIN_RULE_LOOKUP } from './terrain/terrain-rules';

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

  it('keeps row,column semantics for terrain tiles and sprite sheets', () => {
    expect(TERRAIN_RULE_LOOKUP.get('dirt:1,2')?.row).toBe(1);
    expect(TERRAIN_RULE_LOOKUP.get('dirt:1,2')?.column).toBe(2);
    expect(TERRAIN_RULE_LOOKUP.get('grass:2,1')?.row).toBe(2);
    expect(TERRAIN_RULE_LOOKUP.get('grass:2,1')?.column).toBe(1);

    const terrain = new Terrain();
    const tile = (terrain as any).makeTile(0, 0, 'dirt:1,2');

    expect(tile.sheetRow).toBe(1);
    expect(tile.sheetColumn).toBe(2);
    expect(terrain.getBackgroundPosition(tile)).toBe('-256px -128px');
  });
});
