import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [],
})

export class AppComponent {

    // Public properties.
    user;

    // Constructors.
    constructor(
        public af: AngularFire,
        private router: Router
    ) {
        this.af.auth.subscribe(this.onFirebaseAuth);
    }

    // Activation.
    ngOnInit() {
        // Scroll to the top of the view when the route changes.
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            document.body.scrollTop = 0;
        });
    }

    // Private methods.
    onFirebaseAuth = (firebaseAuth) => {
        if (firebaseAuth) {
            // user logged in
            this.user = firebaseAuth;
        }
        else {
            // user not logged in
            this.user = undefined;
        }
    }

    login() {
        this.af.auth.login()
    }

    logout() {
        this.af.auth.logout();
    }
}
