import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompDComponent } from './comp-d.component';

describe('CompDComponent', () => {
  let component: CompDComponent;
  let fixture: ComponentFixture<CompDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
