import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  template: `
    <!--The whole content below can be removed with the new code.-->
    <div style="text-align:center">
      <h1>
        Welcome to {{title}}!!
      </h1>
      <img width="300"
           src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojREQwMDMxO30NCgkuc3Qxe2ZpbGw6I0MzMDAyRjt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI1LDMwIDEyNSwzMCAxMjUsMzAgMzEuOSw2My4yIDQ2LjEsMTg2LjMgMTI1LDIzMCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjUsMzAgMTI1LDUyLjIgMTI1LDUyLjEgMTI1LDE1My40IDEyNSwxNTMuNCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAxMjUsMzAgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjUsNTIuMUw2Ni44LDE4Mi42aDBoMjEuN2gwbDExLjctMjkuMmg0OS40bDExLjcsMjkuMmgwaDIxLjdoMEwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMQ0KCQlMMTI1LDUyLjF6IE0xNDIsMTM1LjRIMTA4bDE3LTQwLjlMMTQyLDEzNS40eiIvPg0KPC9nPg0KPC9zdmc+DQo="/>
    </div>
    <h2>Here are some links to help you start: </h2>
    <ul>
      <li>
        <h2><a target="_blank" href="https://angular.io/tutorial">Tour of Heroes</a></h2>
      </li>
      <li>
        <h2><a target="_blank" href="https://github.com/angular/angular-cli/wiki">CLI Documentation</a></h2>
      </li>
      <li>
        <h2><a target="_blank" href="http://angularjs.blogspot.ca/">Angular blog</a></h2>
      </li>
    </ul>


    <ngx-datatables-portlet caption="Users">
      <ng-template ngxDatatablesTemplate="filters">
        <div class="row">
          <div class="col-md-4 form-group">
            <label for="countryFilter">Country</label>
            <input id="countryFilter" name="country.countryName"
                   class="form-control"
                   type="text" placeholder="Country"/>
          </div>
          <div class="col-md-4 form-group">
            <label for="bankCodeFilter">Bank Code</label>
            <input id="bankCodeFilter" name="bankCode" class="form-control"
                   type="text" placeholder="Bank Code"/>
          </div>
          <div class="col-md-4 form-group">
            <label for="bankNameFilter">Bank Name</label>
            <input id="bankNameFilter" name="bankName" class="form-control"
                   type="text" placeholder="Bank Name"/>
          </div>
        </div>
      </ng-template>
      <ng-template ngxDatatablesTemplate="actions">
        <div class="row">
          <div class="col-md-6">
            <button class="btn btn-success" title="New"><i class="fa fa-file"></i> New</button>
          </div>
          <div class="col-md-6 text-right">
            <button class="btn blue-hoki" title="Export"><i class="fa fa-download"></i> Export</button>
            <button class="btn blue-hoki" title="Search"><i class="fa fa-search"></i> Search</button>
          </div>
        </div>
      </ng-template>

      <ngx-datatables [data]="data" [ajax]="ajax">
        <ngx-datatables-column header="User Role" [rowSelector]="true" param="field" field="field">
        </ngx-datatables-column>

        <ngx-datatables-column header="User Role" field="name">
          <ng-template ngxDatatablesTemplate="header">Name</ng-template>
        </ngx-datatables-column>
        <ngx-datatables-column header="Job" field="job">

        </ngx-datatables-column>
        <ngx-datatables-column header="Type" field="field">

        </ngx-datatables-column>
        <ngx-datatables-column header="Actions" param="field" field="field">
          <ng-template ngxDatatablesTemplate="body" let-context>
            <div class="btn-toolbar">
              <a (click)="_onClick($event,context)" class="btn btn-sm blue-hoki" href="javascript:"
                 title="Search">
                <i class="glyphicon glyphicon-search"></i>
              </a>
              <a (click)="_onClick($event,context)" class="btn btn-sm blue-hoki green-steel" href="javascript:"
                 title="Edit">
                <i class="glyphicon glyphicon-pencil"></i>
              </a>
              <a (click)="_onClick($event,context)" class="btn btn-sm blue-hoki red-haze" href="javascript:"
                 title="Delete">
                <i class="glyphicon glyphicon-search"></i>
              </a>
            </div>
          </ng-template>
        </ngx-datatables-column>

      </ngx-datatables>

    </ngx-datatables-portlet>
  `,
  styles: [`

  `]
})
export class AppComponent implements OnInit {
  data: Object[];
  ajax: DataTables.FunctionAjax;
  title:string="";

  constructor() {
  }

  ngOnInit() {
    this.data = [
      {field: 'vin', header: 'Vin', name: 'Tiger Nixon', job: "System Architect"},
      {field: 'year', header: 'Year', name: 'Garrett Winters', job: "Accountant"},
      {field: 'brand', header: 'Brand', name: 'Angelica', job: "Chief Executive Officer (CEO)"},
      {field: 'color', header: 'Color', name: '$170,750', job: "System Architect"}
    ];
    let cc = [
      {field: 'vin', header: 'Vin', name: 'Tiger Nixon', job: "System Architect"},
      {field: 'year', header: 'Year', name: 'Garrett Winters', job: "Accountant"},
      {field: 'brand', header: 'Brand', name: 'Angelica', job: "Chief Executive Officer (CEO)"},
      {field: 'color', header: 'Color', name: '$170,750', job: "System Architect"},
      {field: 'color', header: 'Color', name: '$170,750', job: "System Architect"}
    ];
    let x = 1;
    this.ajax = (data: any, callback, settings) => {
      //let this_ = this;
      setTimeout(() => {
        x++;
        //this.ajaxDataListener.next(v);
        callback({
          "draw": data.draw,
          "recordsTotal": 57,
          "recordsFiltered": 57,
          data: x % 2 < 2 ? this.data : cc
        });
      }, 200);
    };
  }

  _onClick($event: any, $implicitData?: any): void {
    console.log($event);
    console.log($implicitData);
  }
}
