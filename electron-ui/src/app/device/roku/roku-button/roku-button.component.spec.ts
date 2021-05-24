import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RokuButtonComponent } from './roku-button.component';

describe('RokuButtonComponent', () => {
  let component: RokuButtonComponent;
  let fixture: ComponentFixture<RokuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RokuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RokuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
