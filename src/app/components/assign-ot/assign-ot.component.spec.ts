import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOTComponent } from './assign-ot.component';

describe('AssignOTComponent', () => {
  let component: AssignOTComponent;
  let fixture: ComponentFixture<AssignOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignOTComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
