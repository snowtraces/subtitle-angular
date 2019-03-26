import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SRTSuntitleUnit} from '../entity/SRTSuntitleUnit';

@Component({
  selector: 'app-sub-editor',
  templateUrl: './sub-editor.component.html',
  styleUrls: ['./sub-editor.component.css']
})
export class SubEditorComponent implements OnInit {
  term: string;
  result: SRTSuntitleUnit[];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.term = this.route.snapshot.paramMap.get('term');
  }

  getData(result: SRTSuntitleUnit[]) {
    this.result = result;
  }

}
