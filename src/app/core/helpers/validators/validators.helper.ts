import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static OnlyNumbers(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("^[0-9]+$");

      if (!regex.test(control.value)) {
        return { onlyNumbers: true };
      }
    }

    return null;
  }

  static Mobile(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const regex = new RegExp("^5[0-9].*$");

      if (!regex.test(control.value)) {
        return { Mobile: true };
      }
    }

    return null;
  }

  static OnlyLatinOrGeorgianAlphabet(
    control: AbstractControl
  ): ValidationErrors | null {
    if (control && control.value) {
      const regexGeorgian = new RegExp("^[ა-ჰ]+$");
      const regexLatin = new RegExp("^[a-zA-Z]+$");

      if (
        !(regexGeorgian.test(control.value) || regexLatin.test(control.value))
      ) {
        return { OnlyLatinOrGeorgianAlphabet: true };
      }
    }
  }
}
