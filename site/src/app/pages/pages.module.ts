import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { NgxMaskModule } from "ngx-mask";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { SharedModule } from "../shared/shared.module";
import { IndexComponent } from "./index/index.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  declarations: [IndexComponent, NotFoundComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ScrollToModule.forRoot(),
    NgbModalModule,
    NgxYoutubePlayerModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
