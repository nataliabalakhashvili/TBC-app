import { NotificationsService } from "./../../../core/services/notifications/notifications.service";
import { CommonService } from "./../../../core/services/clients/common.service";
import { AddAccountComponent } from "./add-account.component";
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

const routes: Routes = [
  {
    path: "",
    component: AddAccountComponent,
  },
];

@NgModule({
  declarations: [AddAccountComponent],
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
  ],
  providers: [CommonService, NotificationsService],
})
export class AddAccountModule {}
