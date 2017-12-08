import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {DatatablesTemplateComponent} from "./datatables-template.component";

describe('DatatablesTemplateComponent', () => {
  let component: DatatablesTemplateComponent;
  let fixture: ComponentFixture<DatatablesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatablesTemplateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
