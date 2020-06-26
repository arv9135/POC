import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompEComponent } from './comp-e.component';

describe('CompEComponent', () => {
  let component: CompEComponent;
  let fixture: ComponentFixture<CompEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
