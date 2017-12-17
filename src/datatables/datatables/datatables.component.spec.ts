import {async, ComponentFixture, TestBed} from '@angular/core/testing';

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

  it('should override template ngx-datatables-column with options settings', async(() => {
    const options: DataTables.Settings = {
      columns: [{orderable: false, title: 'NAME Override'}, {title: 'Job Title'}],
      //columnDefs:[{targets:0,title:'Reals1',orderable:true},{targets:0,title:'Reals2'}]
    };
    component.options = options;
    fixture.detectChanges();
    const thCols: DebugElement[] = fixture.debugElement.queryAll(By.css('table thead tr th'));
    expect(thCols.length).toEqual(options.columns.length);
    for (let x = 0; x < thCols.length; x++) {
      expect(thCols[x].nativeElement.textContent).toEqual(options.columns[x].title);
    }
  }));

});

/*Test Datatables Component*/
@Component({
  template: `
    <ngx-datatables [data]="data" [options]="options" tableClass="display">
      <table class="display">
        <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
        </thead>
      </table>
    </ngx-datatables>`
})
class TestDatatablesComponent implements OnInit {
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
