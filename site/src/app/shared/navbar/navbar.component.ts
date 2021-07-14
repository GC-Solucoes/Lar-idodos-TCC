import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

/**
 * Navbar component
 */
export class NavbarComponent implements OnInit {
    currentSection = '';

    ngOnInit(): void {
        //throw new Error('Method not implemented.');
    }

    /**
   * Window scroll method
   */
    windowScroll() {
        const navbar = document.getElementById('navbar');
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop > 50) {
            navbar.classList.add('nav-sticky');
        } else {
            navbar.classList.remove('nav-sticky');
        }
    }

    /**
    * Section changed method
    * @param sectionId specify the current sectionID
    */
    onSectionChange(sectionId: string) {
        this.currentSection = sectionId;
    }

    /**
     * Toggle navbar
     */
    toggleMenu() {
        document.getElementById('navbarCollapse').classList.toggle('show');
    }

}