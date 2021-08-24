import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campo-control-error',
  templateUrl: './campo-control-error.component.html',
  styleUrls: ['./campo-control-error.component.scss']
})
export class CampoControlErrorComponent implements OnInit {


@Input() mostrarErro: boolean;
@Input() msgErro: String;

  constructor() { }

  ngOnInit(): void {
  }

}
