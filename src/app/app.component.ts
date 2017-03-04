import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    user = {};

    constructor(
        public af: AngularFire,
        private router: Router
    ) {
        this.af.auth.subscribe(user => {
            if (user) {
                // user logged in
                this.user = user;

                this.router.navigate(['/']);
            }
            else {
                // user not logged in
                this.user = {};
            }
        });
    }

    ngOnInit() {

        // Scroll to the top of the view when the route changes.
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    }
}
