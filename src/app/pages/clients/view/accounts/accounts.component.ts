import { takeUntil } from "rxjs/internal/operators/takeUntil";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/core/services/clients/common.service";
import { NotificationsService } from "src/app/core/services/notifications/notifications.service";
import { EMPTY, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

export interface Account {
  id: string;
  type: number;
  currency: number;
  status: number;
}
@Component({
  selector: "app-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent implements OnInit, OnDestroy {
  protected unsubscribe$ = new Subject<void>();

  @Input()
  clientId: any;

  @Input()
  client: any;
  loading = true;
  accounts: Account[] = [];

  types = [
    { label: "ყველა", value: null },
    { label: "მიმდინარე", value: 0 },
    { label: "შემნახველი", value: 1 },
    { label: "დაგროვებითი", value: 2 },
  ];

  currencies = [
    { label: "ყველა", value: null },
    { label: "GEL", value: 0 },
    { label: "USD", value: 1 },
    { label: "EUR", value: 2 },
    { label: "RUB", value: 3 },
  ];

  statuses = [
    { label: "ყველა", value: null },
    { label: "დახურული", value: 0 },
    { label: "აქტიური", value: 1 },
  ];

  constructor(
    private router: Router,
    private commonService: CommonService,
    private notificator: NotificationsService
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }

  getAccounts(): void {
    this.commonService
      .get(`accounts?clientId=${this.clientId}`)
      .subscribe((response: any) => {
        if (response) {
          this.accounts = response;
          this.loading = false;
        }
      });
  }

  getType(type): string {
    switch (type) {
      case 0:
        return "მიმდინარე";
      case 1:
        return "შემნახველი";
      case 2:
        return "დაგროვებითი";
    }
  }

  getCurrency(currency): string {
    switch (currency) {
      case 0:
        return "GEL";
      case 1:
        return "USD";
      case 2:
        return "EUR";
      case 3:
        return "RUB";
    }
  }

  getStatus(status): string {
    switch (status) {
      case false:
        return "დახურული";
      case true:
        return "აქტიური";
    }
  }

  onAddAccount(): void {
    this.router.navigate([`/clients/view/${this.clientId}/add-account`]);
  }

  onCloseAccount(element): void {
    this.commonService
      .put<any>(`accounts/${element.id}`, {
        ...element,
        accountStatus: !element.accountStatus,
      })
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((err) => {
          this.notificator.sayError("ანგარიშის სტატუსი ვერ განახლდა");
          return EMPTY;
        })
      )
      .subscribe((result) => {
        this.notificator.saySuccess("ანგარიშის სტატუსი წარმატებით განახლდა");
        this.getAccounts();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
