import { CommonService } from "./../../core/services/clients/common.service";
import { Router } from "@angular/router";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { EMPTY, Subject } from "rxjs";
import { NotificationsService } from "./../../core/services/notifications/notifications.service";
import { catchError, takeUntil } from "rxjs/operators";
import { Table } from "primeng/table";
import { PrimeNGConfig } from "primeng/api";
import { getGender } from "src/app/core/enums/gender.enum";

export interface Client {
  id: number;
  name: string;
  lastName: string;
  gender: string;
  privateNumber: string;
  mobile: string;
  legalAddressCountry: string;
  legalAddressCity: string;
  legalAddress: string;
  physicalAddressCountry: string;
  physicalAddressCity: string;
  physicalAddress: string;
  photo: string;
}

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClientsComponent implements OnInit, AfterViewInit, OnDestroy {
  getGender = getGender;
  protected unsubscribe$ = new Subject<void>();

  @ViewChild("dt") table: Table;

  clients: Client[] = [];

  resultsLength = 0;
  loading = true;

  genders = [
    { label: "ყველა", value: null },
    { label: "ქალი", value: 1 },
    { label: "კაცი", value: 2 },
  ];
  totalRecords: any;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private notificator: NotificationsService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.getClientsData();
    this.primengConfig.ripple = true;
  }

  ngAfterViewInit(): void {}

  getClientsData(): void {
    this.commonService.get(`clients`).subscribe((response: any) => {
      this.totalRecords = response.length;
      this.clients = response;
      this.loading = false;
    });
  }

  onEdit(id: number): void {
    this.router.navigate(["/clients/edit", id]);
  }

  onViewClick(id: number): void {
    this.router.navigate(["/clients/view", id]);
  }

  onDelete(id: number): void {
    this.commonService
      .delete(`clients/${id}`)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((err) => {
          this.notificator.sayError("კლიენტის წაშლა ვერ მოხერხდა");
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.notificator.saySuccess("კლიენტი წარმატებით წაიშალა");
        this.getClientsData();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
