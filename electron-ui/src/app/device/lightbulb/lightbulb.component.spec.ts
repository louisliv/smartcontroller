import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightbulbComponent } from './lightbulb.component';

describe('LightbulbComponent', () => {
  let component: LightbulbComponent;
  let fixture: ComponentFixture<LightbulbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LightbulbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LightbulbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
