import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  // Loader
  isLoading: boolean;

  ngOnInit() {
    this.isLoading = true;
    this.spinner.show();

    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide();
    }, 2000);
  }
}
