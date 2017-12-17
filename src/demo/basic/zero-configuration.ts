import {Component} from "@angular/core";

@Component({
  template: `
    <table class="display" ngxDatatables>
      <thead>
      <tr>
        <th>Name</th>
        <th>Job Role</th>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td>Tiger Nixon</td>
        <td>System Architect</td>
      </tr>
      <tr>
        <td>Garrett Winters</td>
        <td>Accountant</td>
      </tr>
      <tr>
        <td>Ashton Cox</td>
        <td>Junior Technical Author</td>
      </tr>
      <tr>
        <td>Cedric Kelly</td>
        <td>Senior Javascript Developer</td>
      </tr>
      <tr>
        <td>Airi Satou</td>
        <td>Accountant</td>
      </tr>
      </tbody>
    </table>
  `
})
export class ZeroConfiguration {
}
