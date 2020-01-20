import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompagnieComponent } from './admin-compagnie.component';

describe('AdminCompagnieComponent', () => {
  let component: AdminCompagnieComponent;
  let fixture: ComponentFixture<AdminCompagnieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompagnieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompagnieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
