import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {DatatablesPortletComponent} from "./datatables-portlet.component";

describe('DatatablesPortletComponent', () => {
  let component: DatatablesPortletComponent;
  let fixture: ComponentFixture<DatatablesPortletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatablesPortletComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesPortletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
