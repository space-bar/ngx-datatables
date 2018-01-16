import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'demo-app',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  data: Object[];
  ajax: DataTables.FunctionAjax;
  options: DataTables.Settings;

  constructor() {
  }

  ngOnInit() {
    this.data = [
      {field: 'vin', header: 'Vin', name: 'Tiger Nixon', job: 'System Architect'},
      {field: 'year', header: 'Year', name: 'Garrett Winters', job: 'Accountant'},
      {field: 'brand', header: 'Brand', name: 'Angelica', job: 'Chief Executive Officer (CEO)'},
      {field: 'color', header: 'Color', name: '$170,750', job: 'System Architect'}
    ];
    const cc = [
      {field: 'vin', header: 'Vin', name: 'Tiger Nixon', job: 'System Architect'},
      {field: 'year', header: 'Year', name: 'Garrett Winters', job: 'Accountant'},
      {field: 'brand', header: 'Brand', name: 'Angelica', job: 'Chief Executive Officer (CEO)'},
      {field: 'color', header: 'Color', name: '$170,750', job: 'System Architect'},
      {field: 'color', header: 'Color', name: '$170,750', job: 'System Architect'}
    ];

    let t;
    this.ajax = (data: any, callback, settings) => {
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        const d = Array.of(...this.data);
        d.forEach((row, index) => {
          row['field'] = index + data.start;
        });

        callback({
          'draw': data.draw,
          'recordsTotal': 50,
          'recordsFiltered': 50,
          data: d
        });
      }, 200);
    };

    this.options = {
      ajax: this.ajax,
      processing: true,
      'columns': [
        {'data': 'field'},
        {'data': 'header'},
        {'data': 'name'},
        {'data': 'name'}
      ]
    };
    const c = [
      ['Tiger Nixon', 'System Architect', 'Edinburgh', '5421', '2011/04/25', '$320,800'],
      ['Garrett Winters', 'Accountant', 'Tokyo', '8422', '2011/07/25', '$170,750'],
      ['Ashton Cox', 'Junior Technical Author', 'San Francisco', '1562', '2009/01/12', '$86,000'],
      ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', '6224', '2012/03/29', '$433,060'],
      ['Airi Satou', 'Accountant', 'Tokyo', '5407', '2008/11/28', '$162,700']
    ];

  }


  _onClick($event: any, $implicitData?: any): void {
    console.log($event);
    console.log($implicitData);
  }

}
