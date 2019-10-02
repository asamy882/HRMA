import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {switchMap} from "rxjs/operators";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LanguageService {
  private langs = ['en', 'ar'];
  public local$ = new Subject<string>();
  public currentLang: string;
  public currentDir: string;

  constructor(private translateService: TranslateService) {
    let lang = 'en';
    if (localStorage.getItem('current_lang')) {
      lang = localStorage.getItem('current_lang');
    }
    this.translateService.addLangs(this.langs);
    this.setCurrentLanguage(lang);
  }

  setCurrentLanguage(lang: string) {
    this.currentLang = lang;
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    localStorage.setItem('current_lang', lang);
    this.currentDir = lang === 'en' ? 'ltr' : 'rtl';
    this.local$.next(lang);
  }

  get(params: string | string[], options?: any) {
    const translate$ = this.translateService.get(params, options);
    const result = new Subject<string>();
    return result.pipe(switchMap(() => translate$));
  }

  currentLanguageIsEnglish(): boolean {
    return this.currentLang && this.currentLang == 'en';
  }

  currentLanguageIsArabic(): boolean {
    return this.currentLang && this.currentLang == 'ar';
  }

}
