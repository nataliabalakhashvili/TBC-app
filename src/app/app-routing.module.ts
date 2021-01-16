import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/clients/clients.module").then(m => m.ClientsModule)
  },
  {
    path: "clients",
    loadChildren: () =>
      import("./pages/clients/clients.module").then(m => m.ClientsModule)
  },
  {
    path: "error",
    loadChildren: () =>
      import("./pages/error-page/error-page.module").then(
        m => m.ErrorPageModule
      )
  },
  { path: "**", redirectTo: "error" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
