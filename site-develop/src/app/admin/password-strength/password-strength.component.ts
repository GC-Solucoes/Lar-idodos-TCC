import { Component, OnChanges, SimpleChange, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent implements OnChanges {

  @Input() public passwordToCheck: string;

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;

  msg = '';

  private colors = ['darkred', 'orangered', 'orange', 'yellowgreen'];

  constructor() { }

  private static checkStrength(p) {
    // 1
    let force = 0;

    // 2
    const regex = /[$-/:-?{-~!"^_@`\[\]]/g;
    const lowerLetters = /[a-z]+/.test(p);
    const upperLetters = /[A-Z]+/.test(p);
    const numbers = /[0-9]+/.test(p);
    const symbols = regex.test(p);

    // 3
    const flags = [lowerLetters, upperLetters, numbers, symbols];

    // 4
    let passedMatches = 0;
    for (const flag of flags) {
      passedMatches += flag === true ? 1 : 0;
    }

    // 5
    force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = (p.length <= 8) ? Math.min(force, 10) : force;

    // 7
    force = (passedMatches === 1) ? Math.min(force, 10) : force;
    force = (passedMatches === 2) ? Math.min(force, 20) : force;
    force = (passedMatches === 3) ? Math.min(force, 30) : force;
    force = (passedMatches === 4) ? Math.min(force, 40) : force;

    return force;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes.passwordToCheck.currentValue;
    this.setBarColors(4, '#DDD');

    if (password) {
      const c = this.getColor(PasswordStrengthComponent.checkStrength(password));
      this.setBarColors(c.idx, c.col);


      switch (c.idx) {
        case 1:
          this.msg = 'Muito Fraca';
          break;
        case 2:
          this.msg = 'Fraca';
          break;
        case 3:
          this.msg = 'Boa';
          break;
        case 4:
          this.msg = 'Muito Boa';
          break;
      }
    } else {
      this.msg = '';
    }


  }


  private getColor(s) {
    let idx = 0;
    if (s <= 10) {
      idx = 0;
    } else if (s <= 20) {
      idx = 1;
    } else if (s <= 30) {
      idx = 2;
    } else if (s <= 40) {
      idx = 3;
    } else {
      idx = 4;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }




  private setBarColors(count, col) {
    for (let n = 0; n < count; n++) {
      this['bar' + n] = col;

    }
  }

}
