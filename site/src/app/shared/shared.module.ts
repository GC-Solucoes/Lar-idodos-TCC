import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { FeatherModule } from "angular-feather";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Calendar,
  Clock,
  Facebook,
  Instagram,
  Layout,
  LifeBuoy,
  Link,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  PieChart,
  Rss,
  Send,
  Server,
  Shield,
  Triangle,
  Twitter,
  User,
} from "angular-feather/icons";
import { PagesRoutingModule } from "../pages/pages-routing.module";
import { BlogComponent } from "./blog/blog.component";
import { ContactComponent } from "./contact/contact.component";
import { FeaturesComponent } from "./features/features.component";
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PricingComponent } from "./pricing/pricing.component";
import { ScrollspyDirective } from "./scrollspy.directive";
import { DropdownService } from "./services/dropdown.service";
import { ServicesComponent } from "./services/services.component";

const icons = {
  Mail,
  Link,
  PhoneCall,
  Clock,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Calendar,
  User,
  Server,
  Rss,
  Layout,
  LifeBuoy,
  ArrowRightCircle,
  PieChart,
  Triangle,
  Lock,
  Shield,
  Phone,
  ArrowLeftCircle,
};

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    FeaturesComponent,
    PricingComponent,
    BlogComponent,
    ContactComponent,
    ServicesComponent,
    FooterComponent,
    ScrollspyDirective,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(icons),
    PagesRoutingModule,
    ScrollToModule.forRoot(),
    ReactiveFormsModule,
  ],
  // tslint:disable-next-line: max-line-length
  exports: [
    FeaturesComponent,
    PricingComponent,
    BlogComponent,
    ContactComponent,
    ServicesComponent,
    FooterComponent,
    FeatherModule,
    ScrollspyDirective,
    NavbarComponent,
  ],
  providers: [DropdownService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
