# ngx-datatables [![NPM version](https://badge.fury.io/js/spacebar.svg)](https://npmjs.org/package/spacebar) [![Build Status](https://travis-ci.org/blackbox-project/spacebar.svg?branch=master)](https://travis-ci.org/blackbox-project/spacebar)

> Angular DataTable library based on the popular jQuery DataTables

## Installation

```sh
$ npm install --save @spacebar/ngx-datatables
```
######  Depencencies
```
npm install jquery --save
npm install datatables.net --save
npm install datatables.net-dt --save

npm install @types/jquery --save-dev
npm install @types/datatables.net --save-dev

```
######  Depencencies DataTable Extensions 
```
npm install datatables.net-responsive --save
npm install datatables.net-select --save
```

## Usage

######  Import DatatablesModules
```
import { NgModule } from '@angular/core';
import {DatatablesModule} from '@spacebar/ngx-datatables';

@NgModule({
  imports: [
    DatatablesModule
  ]
})
export class AppModule {
}
```

######  Basic ngx-datatables html 
```
 <ngx-datatables [options]="datatablesOptions">
 
    <ngx-datatables-column header="Name" field="name">
    </ngx-datatables-column>
    
    <ngx-datatables-column header="Description" field="description">
    </ngx-datatables-column>
    
 </ngx-datatables>
```
######  Using Custom Column Content
```
<ngx-datatables-column header="Thumbnail" field="id">
 <ng-template ngxDatatablesTemplate="body">
    <img src="..."/>
 </ng-template>
</ngx-datatables-column>
```

######  Using Row Selector
```
<ngx-datatables-column [rowSelector]="true" field="id">
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
## Work still in progress
## License

MIT © [Oluwaseun Ogunjimi](). Released under the MIT license. 
