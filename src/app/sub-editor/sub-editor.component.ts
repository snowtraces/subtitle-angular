import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sub-editor',
  templateUrl: './sub-editor.component.html',
  styleUrls: ['./sub-editor.component.css']
})
export class SubEditorComponent implements OnInit {
  term: string

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.term = this.route.snapshot.paramMap.get('term');
  }

}
