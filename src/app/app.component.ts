import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Object[];
  ajax: DataTables.FunctionAjax;

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
