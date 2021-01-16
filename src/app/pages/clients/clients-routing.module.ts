import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ClientsComponent } from "./clients.component";

const routes: Routes = [
  {
    path: "",
    component: ClientsComponent,
  },
  {
    path: "add",
    loadChildren: () =>
      import("./detail/client-detail.module").then((m) => m.ClientDetailModule),
  },
  {
    path: "edit/:id",
    loadChildren: () =>
      import("./detail/client-detail.module").then((m) => m.ClientDetailModule),
  },
  {
    path: "view/:id/add-account",
    loadChildren: () =>
      import("./add-account/add-account.module").then(
        (m) => m.AddAccountModule
      ),
  },
  {
    path: "view/:id",
    loadChildren: () =>
      import("./view/client-view.module").then((m) => m.ClientViewModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
