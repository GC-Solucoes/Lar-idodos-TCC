import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { OndeEstamosService } from './onde-estamos.service';
import { OndeEstamos } from './interface onde-estamos/onde-estamos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-onde-estamos-admin',
  templateUrl: './onde-estamos-admin.component.html',
  styleUrls: ['./onde-estamos-admin.component.scss']
})
export class OndeEstamosAdminComponent implements OnInit {

  ondeEstamos: OndeEstamos[];
  OndeEstamos: any;
  submitted = false; // submisions status

  constructor(private route: ActivatedRoute,  private OndeEstamosService: OndeEstamosService) { }

  ngOnInit(): void {

    this.OndeEstamosService
    .getAll()
    .pipe(first())
    .subscribe((OndeEstamos) => {
      this.ondeEstamos = OndeEstamos
    });
  }



  delete(id:number) {
    this.OndeEstamosService.delete(id)
    .subscribe(
      data => {
    this.submitted = true;
    this.ngOnInit()
      }
    )


    }




}
