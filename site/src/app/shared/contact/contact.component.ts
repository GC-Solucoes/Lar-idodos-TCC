import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  formInvalid = false;
  errorMessage = '';
  sendSuccess = false;

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensagem: ['', Validators.required],
    });
  }

  get f() { return this.contactForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.formInvalid = false;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      setTimeout(() => {
        this.spinner.hide();
      }, 500);

      this.formInvalid = true;
      this.errorMessage = '* Todos os campos são obrigatórios.';
      console.log('invalid');
      console.log(this.contactForm.errors);
      console.log(this.contactForm.value);
      return;
    }

    this.contactForm.reset();

    setTimeout(() => {
      this.spinner.hide();
    }, 500);

    this.sendSuccess = true;
  }

}
