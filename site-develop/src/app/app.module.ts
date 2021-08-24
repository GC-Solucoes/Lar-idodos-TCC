import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import localePt from '@angular/common/locales/pt';
//bootstrap
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
  registerLocaleData,
} from '@angular/common';


import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { TokenInterceptorService } from "./admin/login/token-interceptor.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PagesModule } from "./pages/pages.module";

// import { AdminModule } from './admin/admin.module';
registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent,
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    // AdminModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    // NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
     useClass: TokenInterceptorService,
     multi: true ,
         },
         {provide: LOCALE_ID, useValue: 'pt', }
    ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor() {
    registerLocaleData(localePt);
}
}
