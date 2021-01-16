import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Table } from "primeng/table";
import { EMPTY } from "rxjs";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { catchError } from "rxjs/operators";
import { CommonService } from "src/app/core/services/clients/common.service";
import { NotificationsService } from "src/app/core/services/notifications/notifications.service";

@Component({
  selector: "app-client-view",
  templateUrl: "./client-view.component.html",
  styleUrls: ["./client-view.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClientViewComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  @ViewChild("dt") table: Table;

  clientId: number;
  client: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private notificator: NotificationsService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]) {
      this.clientId = +this.activatedRoute.snapshot.params["id"];
      this.getClient();
    }
  }

  getClient(): void {
    this.commonService
      .get(`clients?id=${this.clientId}`)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((err) => {
          this.notificator.sayError("კლიენტი ვერ მოიძებნა");
          return EMPTY;
        })
      )
      .subscribe((response) => {
        if (response) {
          this.client = response[0];
        }
      });
  }

  onClientsListButtonClick(): void {
    this.router.navigate(["/clients"]);
  }

  getGender(gender: number): string {
    switch (gender) {
      case 1:
        return "ქალი";
      case 2:
        return "კაცი";
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
