import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableArchivesComponent } from './table-archives.component';

describe('TableArchivesComponent', () => {
  let component: TableArchivesComponent;
  let fixture: ComponentFixture<TableArchivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableArchivesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableArchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
