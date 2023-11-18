import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentStatsPage } from './student-stats.page';

describe('StudentStatsPage', () => {
  let component: StudentStatsPage;
  let fixture: ComponentFixture<StudentStatsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StudentStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
