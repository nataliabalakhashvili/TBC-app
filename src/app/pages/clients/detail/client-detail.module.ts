import { CommonService } from "./../../../core/services/clients/common.service";
import { NotificationsService } from "src/app/core/services/notifications/notifications.service";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientDetailComponent } from "./client-detail.component";
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
    component: ClientDetailComponent,
  },
];

@NgModule({
  declarations: [ClientDetailComponent],
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
  providers: [NotificationsService, CommonService],
})
export class ClientDetailModule {}
