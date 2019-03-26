import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FileService} from '../service/file.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  private fileToUpload: File = null;
  @Output() sendResult: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fileService: FileService) {
  }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.fileService.postFile(this.fileToUpload).subscribe(
      data => {
        this.sendResult.emit(data);
      }, error => {
        console.log(error);
      });
  }


}
