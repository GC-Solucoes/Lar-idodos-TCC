import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  error = '';
  loginForm: FormGroup = this.formBuilder.group({});

  constructor(  private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) {
      // redirect to home if already logged in
      if (this.loginService.userValue) {
        this.router.navigate(['/']);
    }

     }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
  });

  }

 // convenience getter for easy access to form fields
 get f() {
  return this.loginForm.controls;
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
      return;
  }

  this.loading = true;
  this.loginService
      .login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe({
          next: (user) => {
              var returnUrl =
                  this.route.snapshot.queryParams['returnUrl'] || '/admin';

              // if (user.primeiroAcesso == true) {
              //     returnUrl = '/primeiro-acesso';
              // }

              this.router.navigateByUrl(returnUrl);
          },
          error: (error) => {
              this.error = error;
              this.loading = false;
          },
      });
}



}
