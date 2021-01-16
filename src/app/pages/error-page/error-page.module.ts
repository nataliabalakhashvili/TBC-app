import { MatButtonModule } from "@angular/material/button";
import { ErrorPageComponent } from "./error-page.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ErrorPageComponent
  }
];

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule]
})
export class ErrorPageModule {}
