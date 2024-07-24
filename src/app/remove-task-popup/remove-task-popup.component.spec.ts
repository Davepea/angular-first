import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTaskPopupComponent } from './remove-task-popup.component';

describe('RemoveTaskPopupComponent', () => {
  let component: RemoveTaskPopupComponent;
  let fixture: ComponentFixture<RemoveTaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveTaskPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
