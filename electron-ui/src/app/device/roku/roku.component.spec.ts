import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RokuComponent } from './roku.component';

describe('RokuComponent', () => {
  let component: RokuComponent;
  let fixture: ComponentFixture<RokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RokuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
