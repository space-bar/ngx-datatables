
# ngx-datatables  [![NPM version](https://badge.fury.io/js/ngx-datatables.svg)](https://npmjs.org/package/@spacebar/ngx-datatables) [![Build Status](https://travis-ci.org/space-bar/ngx-datatables.svg?branch=master)](https://travis-ci.org/space-bar/ngx-datatables)
----

> Angular DataTable library based on the popular jQuery [DataTables](https://datatables.net/)


## Installation

#### Using npm
```
$ npm install --save @spacebar/ngx-datatables

```

####  Dependencies

```
npm install jquery --save
npm install datatables.net --save
npm install datatables.net-dt --save

npm install @types/jquery --save-dev
npm install @types/datatables.net --save-dev

```
####  Optional Dependencies for DataTable Extensions
```
npm install datatables.net-responsive --save
npm install datatables.net-select --save

```

## Configuration

#### using angular-cli.json

```
{
  "apps": [
    {
      ...
      "styles": [
        "../node_modules/datatables.net-dt/css/jquery.dataTables.css"
      ],
      "scripts": [
        "../node_modules/jquery/dist/jquery.js",
        "../node_modules/datatables.net/js/jquery.dataTables.js"
      ],
      ...
    }
  ]
}

```
## Usage

#### Import Module
```
import { NgModule } from '@angular/core';
import {DatatablesModule} from '@spacebar/ngx-datatables';

@NgModule({
  ...
  imports: [
    DatatablesModule
  ]
  ...
})
export class AppModule {
}

```

####  Javascript sourced data

> Javascript sourced data defaults to client-side option

```
<ngx-datatables [data]="data">
   <ngx-datatables-column header="Name"></ngx-datatables-column>
   <ngx-datatables-column header="Position"></ngx-datatables-column>
   <ngx-datatables-column header="Office"></ngx-datatables-column>
   <ngx-datatables-column header="Extension"></ngx-datatables-column>
   <ngx-datatables-column header="Start Date"></ngx-datatables-column>
   <ngx-datatables-column header="Salary"></ngx-datatables-column>
</ngx-datatables>

 
 export class SampleComponent {
  data: Object[];
  
  constructor() {
    this.data = [
      ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
      ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
      ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"]
    ];
  }
}
```

####  Ajax sourced data

> Ajax sourced data defaults to server-side option. The `ajax` attribute
> accepts a string url, a function or jquery ajax option. 

```
<ngx-datatables [ajax]="ajax">
   <ngx-datatables-column header="Name"></ngx-datatables-column>
   <ngx-datatables-column header="Position"></ngx-datatables-column>
   <ngx-datatables-column header="Office"></ngx-datatables-column>
   <ngx-datatables-column header="Extension"></ngx-datatables-column>
   <ngx-datatables-column header="Start Date"></ngx-datatables-column>
   <ngx-datatables-column header="Salary"></ngx-datatables-column>
</ngx-datatables>

 
 export class SampleComponent {
  ajax: DataTables.FunctionAjax;
  
  constructor() {
  const data = [
      ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
      ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
      ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"]
    ];
    //simulation of an ajax call
    this.ajax = (dtData: any, callback, settings) => {
      setTimeout(() => {
        callback({
          "draw": dtData.draw,
          "recordsTotal": 57,
          "recordsFiltered": 57,
          data: data
        });
      }, 200);
    };
  }
}
```
####  Using Options Settings

> The [`options`](https://datatables.net/reference/option/) attribute accepts a [DataTables.Settings](https://datatables.net/reference/type/DataTables.Settings) type.
> DataTables.Settings has a columns property which is an array of column settings and it is equivalent to the `ngx-datatables-column` tag
> Note that the DataTables options columns settings takes precedency if defined.

```
 <ngx-datatables [options]="options">
    <ngx-datatables-column header="Name"></ngx-datatables-column>
    <ngx-datatables-column header="Position"></ngx-datatables-column>
    <ngx-datatables-column header="Office"></ngx-datatables-column>
    <ngx-datatables-column header="Extension"></ngx-datatables-column>
    <ngx-datatables-column header="Start Date"></ngx-datatables-column>
    <ngx-datatables-column header="Salary"></ngx-datatables-column>
 </ngx-datatables>


 export class SampleComponent {
  options: DataTables.Settings;
  
  constructor() {
  const data = [
      ["Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800"],
      ["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],
      ["Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000"],
      ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060"],
      ["Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700"]
    ];
    //simulation of an ajax call
    const ajax = (dtData: any, callback, settings) => {
      setTimeout(() => {
        callback({
          "draw": dtData.draw,
          "recordsTotal": 57,
          "recordsFiltered": 57,
          data: data
        });
      }, 200);
    };
  }

  this.options = {
      ajax: ajax,
      "columns": [
        {"data": "field"},
        {"data": "job"},
        {"data": "job"},
        {"data": "job"},
        {"data": "job"}
      ]
    }
}
```

####  Using Object Array as Datasource 

> Below shows multiple ways pass data to `ngx-datatables`. 
> However note that only one of the three attributes is required, hence the `options` takes higher precedency.
> Order of priority is stated as...

 1. `options`
 2. `ajax`
 3. `data`

```
 <ngx-datatables [data]="data" [ajax]=[ajax] [options]="options">
    <ngx-datatables-column header="Name" field="name"></ngx-datatables-column>
    <ngx-datatables-column header="Position" field="position"></ngx-datatables-column>
    <ngx-datatables-column header="Office" field="office"></ngx-datatables-column>
    <ngx-datatables-column header="Extension" field="extn"></ngx-datatables-column>
    <ngx-datatables-column header="Start Date" field="start_date"></ngx-datatables-column>
    <ngx-datatables-column header="Salary" field="salary"></ngx-datatables-column>
 </ngx-datatables>

 
 export class SampleComponent {
  data:Object[];
  ajax: DataTables.FunctionAjax;
  options: DataTables.Settings;
  
  constructor() {
  this.data = [
      {
        "id": "1", "name": "Tiger Nixon",
        "position": "System Architect",
        "salary": "$320,800",
        "start_date": "2011/04/25",
        "office": "Edinburgh",
        "extn": "5421"
      },
      {
        "id": "2",
        "name": "Garrett Winters",
        "position": "Accountant",
        "salary": "$170,750",
        "start_date": "2011/07/25",
        "office": "Tokyo",
        "extn": "8422"
      },
      {
        "id": "3",
        "name": "Ashton Cox",
        "position": "Junior Technical Author",
        "salary": "$86,000",
        "start_date": "2009/01/12",
        "office": "San Francisco",
        "extn": "1562"
      }
    ];

    //simulation of an ajax call
    this.ajax = (dtData: any, callback, settings) => {
      setTimeout(() => {
        callback({
          "draw": dtData.draw,
          "recordsTotal": 57,
          "recordsFiltered": 57,
          data: this.data
        });
      }, 200);
    };

    this.options = {
        ajax: this.ajax,
        responsive: true,
        searching: false,
        processing: true,
        pagingType: "full_numbers",
        lengthMenu: [20, 50, 100, 200, 500],
        order: [[0, 'desc']]
      }
  }
}
```

####  Using Row Selector
```
<ngx-datatables-column [rowSelector]="true" field="id">
</ngx-datatables-column>

```

#### Using Custom Column Content
```
<ngx-datatables-column header="Thumbnail" field="id">
 <ng-template ngxDatatablesTemplate="body">
    <img src="..."/>
 </ng-template>
</ngx-datatables-column>

```


######  Using Row Actions
```
 <ngx-datatables-column header="Actions" field="id">
      <ng-template ngxDatatablesTemplate="body" let-context>
        <div>
          <a (click)="_onEdit($event,context)" class="btn btn-success" href="javascript:"
             title="Edit">
            <i class="glyphicon glyphicon-pencil"></i>
          </a>
          <a (click)="_onDelete($event,context)" class="btn btn-danger" href="javascript:"
             title="Delete">
            <i class="glyphicon glyphicon-trash"></i>
          </a>
        </div>
      </ng-template>
</ngx-datatables-column>
```

## Contributing
> 
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. ~~Submit a pull request~~

## TODO
> 
  1. ngx-datatables-portlet (container for ngx-datatable)
  2. Zero Configuration (using directives)
  2. Site documentation on full functionality
  3. Travis CI 

## Work still in progress

## License

[MIT](/space-bar/ngx-datatables/blob/master/LICENSE) © [Oluwaseun Ogunjimi](). Released under the MIT license. 
