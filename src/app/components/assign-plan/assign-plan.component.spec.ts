import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPlanComponent } from './assign-plan.component';

describe('AssignPlanComponent', () => {
  let component: AssignPlanComponent;
  let fixture: ComponentFixture<AssignPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
