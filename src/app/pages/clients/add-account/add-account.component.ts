import { NotificationsService } from "./../../../core/services/notifications/notifications.service";
import { CommonService } from "./../../../core/services/clients/common.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from "../../../core/helpers/validators/validators.helper";
import { catchError, takeUntil } from "rxjs/operators";
import { EMPTY, Subject } from "rxjs";

@Component({
  selector: "app-add-account",
  templateUrl: "./add-account.component.html",
  styleUrls: ["./add-account.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddAccountComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  client: any;
  form: FormGroup;
  clientId: number;
  currency = [
    { label: "GEL", value: 0 },
    { label: "USD", value: 1 },
    { label: "EUR", value: 2 },
    { label: "RUB", value: 3 },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private commonService: CommonService,
    private notificator: NotificationsService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]) {
      this.clientId = +this.activatedRoute.snapshot.params["id"];
    }

    this.commonService
      .get(`clients?id=${this.clientId}`)
      .subscribe((response) => {
        if (response) {
          this.client = response[0];
          this.createForm();
        }
      });
  }

  private createForm(): void {
    this.form = this.fb.group({
      accountType: [0, Validators.required],
      GEL: [],
      USD: [],
      EUR: [],
      RUB: [],
    });

    this.cdr.detectChanges();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(333333333333, this.form.getRawValue()["currencyGEL"]);
    if (this.form.invalid) {
      this.notificator.sayError("ფორმა არაა ვალიდური, შეავსეთ ველები სწორად");
      return;
    }
    if (
      !this.form.getRawValue().GEL &&
      !this.form.getRawValue().USD &&
      !this.form.getRawValue().EUR &&
      !this.form.getRawValue().RUB
    ) {
      this.notificator.sayError(
        "ანგარიშის შესაქმნელად ვალუტის არჩევა აუცილებელია"
      );
      return;
    }
    const formRawValues = this.form.getRawValue();
    const date = Date.now();

    this.currency.forEach((element) => {
      if (formRawValues[element.label]) {
        this.sendPostRequest(
          element.label,
          element.value,
          date,
          formRawValues
        ).subscribe((result) => {
          this.notificator.saySuccess("ანგარიში წარმატებით დაემატა");
          this.unsubscribe$.next();
        });
      }
    });
  }

  private sendPostRequest(
    currency: string,
    currType: number,
    date: number,
    formRawValues
  ) {
    const requestBody = {
      clientId: this.clientId,
      id: `${currency + date}`,
      accountStatus: true,
      accountType: formRawValues.accountType,
      currency: currType,
    };
    return this.commonService.post<any>("accounts", requestBody);
  }

  onClientsListButtonClick() {
    this.router.navigate([`/clients/view/${this.clientId}`]);
  }

  public getValue(controlName) {
    return this.form.controls[controlName].value;
  }

  checkFormControlValue(controlName) {
    return (
      this.form.get(controlName).invalid &&
      (this.form.get(controlName).dirty || this.form.get(controlName).touched)
    );
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
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
