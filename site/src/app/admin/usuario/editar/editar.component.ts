import { FormValidations } from './../../../shared/form-validations';
import { User } from './../../login/User/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  user = new User();
  routeSub: any;
  confirmPassword: string;
  usuarioForm: FormGroup;
  submitted = false;
  loading = false;

  error = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {

     this.usuarioForm = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required,Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*([A-Z]|[ -\/:-@[-`{-~]))|(?=.*[A-Z])(?=.*[ -\/:-@[-`{-~])(?=.*([0-9]|[a-z])))[a-zA-Z0-9 -\/:-@[-`{-~]{8,}$')]],
      confirmarPassword: ['', [FormValidations.equalsTo('password')]]
 
    });





  this.routeSub = this.route.params.subscribe((params) => {
    var id: number = params['id'];

    if (id) {
        this.usuarioService
            .getById(id)
            .pipe()
            .subscribe((user) => {
                this.user = user;
            });
    }
});
//  console.log(this.user)
  }
onSubmit() {
  this.submitted = true;

  if (this.user.id > 0) {
    this.user = this.user
    if(this.usuarioForm) {
      this.usuarioService.put(this.user, this.user.id).subscribe(
          (response) => {
              console.log('Usuário atualizado com sucesso.');
              alert("Usuário atualizado com sucesso");

              this.router.navigate(['admin/usuarios']);
              //reset form
              // this.usuarioForm.reset();
          },
          (error) => {
            console.log(
                  'Não foi possível atualizar o cadastro do usuário.'
                               );
          }
      );
    } else {
console.log('Formulário Inválido');
this.verificaValidacoesForm(this.usuarioForm);
    }

  } else {
    if(this.usuarioForm.valid) {
      this.usuarioService.post(this.user).subscribe(
          (response) => {
            console.log('Usuário cadastrado com sucesso.');
            alert("Usuário cadastrado com sucesso");
            console.log(this.usuarioForm);
              this.router.navigate(['admin/usuarios']);
              // this.usuarioForm.reset();
          },
          (error) => {
             console.log(error);
            //  extrair chave de objetos

          }
      );
  } else {
    console.log('Formulário Inválido')
this.verificaValidacoesForm(this.usuarioForm);
  }
}
}

changeRoute() {
  if (this.router.url === '/criar') {
      this.user.id = 0;
  } else {
      this.user.id = 1;
  }
}



// comparar campos
static equalsTo(otherField: string) {
const validator = (formControl: FormControl) => {
if (otherField == null) {
  throw new Error('É nescessário informar um campo.');
}

if (!formControl.root || (<FormGroup>formControl.root).controls ) {
  return null;
}

const field = (<FormGroup>formControl.root).get(otherField);

if (!field) {
  throw new Error('É nescessário informar um campo válido.');
}

if ( field.value !== formControl.value) {
  return {
    equalsTo : otherField
  };
}
return null;
};

return validator;
}

verificaValidTouched(campo){

return !this.usuarioForm.get(campo).valid && (this.usuarioForm.get(campo).touched || this.usuarioForm.get(campo).dirty)
}

verificaEmailInvalido() {
  let campoEmail = this.usuarioForm.get('email');
  if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
  }
}


verificaValidacoesForm(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(campo => {
    console.log(campo);
    const controle = formGroup.get(campo);
    controle.markAsDirty();
if(controle instanceof FormGroup) {
this.verificaValidacoesForm(controle);
}

   });
}




aplicaCssErro(campo) {
  return {
    'has-error': this.verificaValidTouched(campo),
    'has-feedback': this.verificaValidTouched(campo)
  }
}



}
