import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent {
  @Input()
  shownImage: any;

  @Input()
  error: boolean;

  @Output()
  uploaded = new EventEmitter();

  showValidationMessage: boolean;

  constructor() {}

  drop(e: DragEvent): void {
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    this.handleFileInput(files);
  }

  handleFileInput(fileList: any): void {
    this.showValidationMessage = false;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      if (/\.(?:jpe?g|png)$/i.test(file.name)) {
        this.showImageLocally(file);
        return;
      }
    }
    this.showValidationMessage = true;
  }

  private uploadFile(file: any) {
    this.uploaded.emit(file);
  }

  private showImageLocally(file: any): void {
    const reader = new FileReader();

    reader.onload = (evt: any) => {
      this.uploaded.emit(evt.target.result);
    };
    reader.readAsDataURL(file);
  }

  // private removeImageLocally(): void {
  //   this.shownImage = null;
  // }
}
