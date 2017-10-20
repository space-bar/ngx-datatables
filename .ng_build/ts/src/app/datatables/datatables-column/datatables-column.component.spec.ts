import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {DatatablesColumnComponent} from "./datatables-column.component";

describe('DatatablesColumnComponent', () => {
  let component: DatatablesColumnComponent;
  let fixture: ComponentFixture<DatatablesColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatablesColumnComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
