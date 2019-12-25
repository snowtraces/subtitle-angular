import {Component, OnInit} from '@angular/core';
import {SRTSubtitleUnit} from '../entity/SRTSubtitleUnit';

@Component({
  selector: 'app-sub-editor',
  templateUrl: './sub-editor.component.html',
  styleUrls: ['./sub-editor.component.css']
})
export class SubEditorComponent implements OnInit {
  result: SRTSubtitleUnit[];

  constructor() {
  }

  ngOnInit() {
  }

  getData(result: SRTSubtitleUnit[]) {
    if (result[0].start) {
      this.result = result;
    }
  }

  transTime2String(time: number): string {
    const mill = Math.round(time % 1000);
    const sec = Math.round((time / 1000) % 60);
    const min = Math.round((time / 1000 / 60) % 60);
    const hour = Math.round(time / 1000 / 60 / 60);

    return this.lengthFix(hour, 2) + ':' + this.lengthFix(min, 2) + ':'
      + this.lengthFix(sec, 2) + ',' + this.lengthFix(mill, 3);
  }

  lengthFix(inNumber: number, length: number): string {
    const inString = String(inNumber);
    return inString.padStart(length, '0');
  }

}
