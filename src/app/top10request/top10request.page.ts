import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/common/services/language.service';

@Component({
  selector: 'app-top10request',
  templateUrl: './top10request.page.html',
  styleUrls: ['./top10request.page.scss'],
})
export class Top10requestPage implements OnInit {

  constructor( public languageService: LanguageService) { }

  ngOnInit() {
  }

}
