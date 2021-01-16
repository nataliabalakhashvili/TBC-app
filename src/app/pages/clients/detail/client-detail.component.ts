import { CommonService } from "./../../../core/services/clients/common.service";
import { NotificationsService } from "src/app/core/services/notifications/notifications.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnDestroy,
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomValidators } from "./../../../core/helpers/validators/validators.helper";
import { catchError, takeUntil } from "rxjs/operators";
import { EMPTY, Subject } from "rxjs";

@Component({
  selector: "app-client-detail",
  templateUrl: "./client-detail.component.html",
  styleUrls: ["./client-detail.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClientDetailComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  client: any;
  form: FormGroup;
  gender = 1;
  photoUrl: string;
  editId: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private notificator: NotificationsService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params["id"]) {
      this.editId = +this.activatedRoute.snapshot.params["id"];
      this.commonService
        .get(`clients?id=${this.editId}`)
        .subscribe((response) => {
          if (response) {
            this.client = response[0];
            this.gender = this.client.gender;
            this.createForm();
          }
        });
    } else {
      this.createForm();
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: [
        this.client && this.client.name,
        [
          Validators.required,
          CustomValidators.OnlyLatinOrGeorgianAlphabet,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        this.client && this.client.lastName,
        [
          Validators.required,
          CustomValidators.OnlyLatinOrGeorgianAlphabet,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      gender: [this.gender, Validators.required],
      privateNumber: [
        this.client && this.client.privateNumber,
        [
          Validators.required,
          CustomValidators.OnlyNumbers,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      mobile: [
        this.client && this.client.mobile,
        [
          Validators.required,
          CustomValidators.OnlyNumbers,
          CustomValidators.Mobile,
          Validators.minLength(9),
          Validators.maxLength(9),
        ],
      ],
      legalAddressCountry: [
        this.client && this.client.legalAddressCountry,
        Validators.required,
      ],
      legalAddressCity: [
        this.client && this.client.legalAddressCity,
        Validators.required,
      ],
      legalAddress: [
        this.client && this.client.legalAddress,
        Validators.required,
      ],
      physicalAddressCountry: [
        this.client && this.client.physicalAddressCountry,
        Validators.required,
      ],
      physicalAddressCity: [
        this.client && this.client.physicalAddressCity,
        Validators.required,
      ],
      physicalAddress: [
        this.client && this.client.physicalAddress,
        Validators.required,
      ],
      photoId: [this.client && this.client.photoId],
    });

    this.cdr.detectChanges();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      this.notificator.sayError("ფორმა არაა ვალიდური, შეავსეთ ველები სწორად");
      return;
    }

    if (this.editId) {
      this.sendPutRequest();
    } else {
      this.sendPostRequest();
    }
  }

  private sendPostRequest(): void {
    const formRawValues = this.form.getRawValue();
    this.commonService
      .post<any>("clients", formRawValues)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((err) => {
          this.notificator.sayError("კლიენტის დამატება ვერ მოხერხდა");
          return EMPTY;
        })
      )
      .subscribe((result) => {
        this.notificator.saySuccess("კლიენტი წარმატებით დაემატა");
        this.router.navigate(["/clients"]);
      });
  }

  private sendPutRequest(): void {
    const formRawValues = this.form.getRawValue();
    this.commonService
      .put<any>(`clients/${this.editId}`, formRawValues)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((err) => {
          this.notificator.sayError("კლიენტის განახლება ვერ მოხერხდა");
          return EMPTY;
        })
      )
      .subscribe((result) => {
        this.notificator.saySuccess("კლიენტი წარმატებით განახლდა");
        this.router.navigate(["/clients"]);
      });
  }

  onClientsListButtonClick() {
    this.router.navigate(["/clients"]);
  }

  onGenderChange(value: number): void {
    this.gender = value;
  }

  public getValue(controlName) {
    return this.form.controls[controlName].value;
  }

  private setValue(controlName, value): void {
    this.form.controls[controlName].setValue(value);
  }

  checkFormControlValue(controlName) {
    return (
      this.form.get(controlName).invalid &&
      (this.form.get(controlName).dirty || this.form.get(controlName).touched)
    );
  }

  onPhotoUploaded(photoUrl: any): void {
    if (photoUrl) {
      this.photoUrl = photoUrl;
      this.setValue("photoId", photoUrl);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
