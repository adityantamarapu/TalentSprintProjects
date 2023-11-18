import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatchListPage } from './batch-list.page';

describe('BatchListPage', () => {
  let component: BatchListPage;
  let fixture: ComponentFixture<BatchListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BatchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
