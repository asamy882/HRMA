import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { HeadersInterceptor } from './services/http-headers-interceptor.service';
import { RouterModule } from '@angular/router';
import { ApplicationHttpInterceptor } from './services/application-http-client-inerceptor.service';

@NgModule({
  imports: [CommonModule,
    RouterModule, TranslateModule.forRoot()],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplicationHttpInterceptor,
      multi: true
    }
  ],
  declarations: [],
  exports: []
})
export class CommonsModule {
}
