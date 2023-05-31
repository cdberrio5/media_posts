import { Component } from '@angular/core';

import { faPenToSquare, faMessage, faRightFromBracket, faLocationArrow, faBars, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  fapentosquare = faPenToSquare;
  famessage = faMessage;
  farightfrombracket = faRightFromBracket;
  falocationarrow = faLocationArrow;
  fabars = faBars;
  fax = faX;

  openMenuBool: boolean = false;

  constructor() {

  }

  openMenu(change: boolean) {
    this.openMenuBool = change;
  }
}
