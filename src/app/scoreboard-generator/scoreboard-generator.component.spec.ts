import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardGeneratorComponent } from './scoreboard-generator.component';

describe('ScoreboardGeneratorComponent', () => {
  let component: ScoreboardGeneratorComponent;



  beforeEach(() => {
    component = new ScoreboardGeneratorComponent();
  });

  it('should add match infos correctly', () => {
    // given
    component.player2 = 'player2';
    component.player1 = 'player1';
    component.interval = 100;
    // when
    component.generateScoreBoard();
    // then
    expect(component.matchsInfos.length).toBe(1);
  });
});
