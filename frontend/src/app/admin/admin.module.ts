import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminService} from "./admin.service";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {
}
