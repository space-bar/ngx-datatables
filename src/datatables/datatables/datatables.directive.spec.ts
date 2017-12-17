import {DatatablesDirective} from './datatables.directive';
import {Component, OnInit} from "@angular/core";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";

describe('DatatablesDirective', () => {
  let fixture: ComponentFixture<TestDatatablesDirective>;
  let directive: TestDatatablesDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatatablesDirective, TestDatatablesDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDatatablesDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

});

/*Test Datatables Component*/
@Component({
  template: `
    <table class="display" [data]="data" ngxDatatables>
      <thead>
      <tr>
        <th>Rolw2</th>
        <th>Name</th>
      </tr>
      </thead>
    </table>
  `
})
class TestDatatablesDirective implements OnInit {
  private data: Object[] = [
    ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
    ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
    ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '1562', '2009/01/12', '$86,000'],
    ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '6224', '2012/03/29', '$433,060'],
    ['Airi Satou', 'Accountant', 'Tokyo', '5407', '2008/11/28', '$162,700']
  ];
  ajax: DataTables.FunctionAjax;
  options: DataTables.Settings;

  ngOnInit() {
  }

  /*get datax(): Object[] {
    if (!this._data || !this._data.length) {
      // lazy loading data
      this._data = [
        ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
        ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
        ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '1562', '2009/01/12', '$86,000'],
        ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '6224', '2012/03/29', '$433,060'],
        ['Airi Satou', 'Accountant', 'Tokyo', '5407', '2008/11/28', '$162,700']
      ];
    }
    return this._data;
  }*/
}
