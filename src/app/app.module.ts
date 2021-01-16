import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NotifierModule } from "angular-notifier";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      behaviour: {
        autoHide: 4000,
        showDismissButton: false,
      },
      position: {
        horizontal: {
          position: "left",
          distance: 16,
        },
        vertical: {
          position: "bottom",
          distance: 30,
          gap: 16,
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
