import { InputTextModule } from "primeng/inputtext";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ClientsRoutingModule } from "./clients-routing.module";
import { ClientsComponent } from "./clients.component";
import { HttpClientModule } from "@angular/common/http";

import { NotificationsService } from "./../../core/services/notifications/notifications.service";
import { CommonService } from "./../../core/services/clients/common.service";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
@NgModule({
  declarations: [ClientsComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    DropdownModule,
  ],
  providers: [CommonService, NotificationsService],
})
export class ClientsModule {}
