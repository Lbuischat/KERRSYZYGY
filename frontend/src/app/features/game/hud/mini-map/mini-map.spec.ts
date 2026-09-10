import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniMap } from './mini-map';

describe('MiniMap', () => {

  let component: MiniMap;
  let fixture: ComponentFixture<MiniMap>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [MiniMap]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MiniMap);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('deve criar o mini mapa', () => {

    expect(component).toBeTruthy();

  });

});