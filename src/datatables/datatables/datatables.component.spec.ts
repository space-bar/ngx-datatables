import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import {DatatablesComponent} from './datatables.component';
import {DatatablesModule} from '../datatables.module';
import {Component, DebugElement, OnInit} from '@angular/core';
import {By} from '@angular/platform-browser';


describe('DatatablesComponent', () => {
  let component: TestDatatablesComponent;
  let fixture: ComponentFixture<TestDatatablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestDatatablesComponent],
      imports: [DatatablesModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDatatablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should override template ngx-datatables-column with options settings', () => {
    const options: DataTables.Settings = {
      columns: [{title: 'Real Name'}, {title: 'Job Title'}],
    };
    component.options = options;
    fixture.detectChanges();
    const thCols: DebugElement[] = fixture.debugElement.queryAll(By.css('table thead tr th'));
    expect(thCols.length).toEqual(options.columns.length);
    for (let x = 0; x > thCols.length; x++) {
      expect(thCols[x]).toEqual(options.columns[x]);
    }
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});

/*Test Datatables Component*/
@Component({
  template: `
    <ngx-datatables [data]="data" [options]="options" tableClass="display">
      <ngx-datatables-column header="Name"></ngx-datatables-column>
      <ngx-datatables-column header="Role"></ngx-datatables-column>
    </ngx-datatables>`
})
class TestDatatablesComponent implements OnInit {
  private _data: Object[];
  ajax: DataTables.FunctionAjax;
  options: DataTables.Settings;

  ngOnInit() {
  }

  get data(): Object[] {
    if (!this._data) {
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
  }
}
