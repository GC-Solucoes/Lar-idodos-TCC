import { first } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../login/User/user';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  users: User[];
  usuario: any;
  submitted = false; // submisions status
  constructor( private route: ActivatedRoute,  private userService: UsuarioService ) { }

  ngOnInit(): void {

    this.userService
    .getAll()
    .pipe(first())
    .subscribe((user) => {
      this.users = user
    });

  }


  delete(id:number) {
    this.userService.delete(id)
    .subscribe(
      data => {
    this.submitted = true;
    this.ngOnInit()
      }
    )


    }



}
