import { NotificationsService } from "src/app/core/services/notifications/notifications.service";
import { CommonService } from "./../../../core/services/clients/common.service";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FileUploaderModule } from "src/app/shared-components/file-uploader/file-uploader.module";
import { ClientViewComponent } from "./client-view.component";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { AccountsComponent } from './accounts/accounts.component';

const routes: Routes = [
  {
    path: "",
    component: ClientViewComponent,
  },
];

@NgModule({
  declarations: [ClientViewComponent, AccountsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FileUploaderModule,
    TableModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [CommonService, NotificationsService],
})
export class ClientViewModule {}
