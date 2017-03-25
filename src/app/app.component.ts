import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AngularFire, AuthProviders } from 'angularfire2';
import { Todo } from './todo';
import { UserAccount } from './user-account';
import { TodoDataService } from './todo-data.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [TodoDataService],
})
export class AppComponent {

    user = {};
    userAccount = new UserAccount();

    constructor(
        public af: AngularFire,
        private todoDataService: TodoDataService,
        private router: Router
    ) {
        this.af.auth.subscribe(this.onFirebaseAuth);
    }

    onFirebaseAuth = (firebaseAuth) => {
        if (firebaseAuth) {
            // user logged in
            this.user = firebaseAuth;

            this.af.database.object(
                '/api/user-accounts/' +
                firebaseAuth.uid
            ).subscribe(this.initializeUserAccount);
        }
        else {
            // user not logged in
            this.user = {};
        }
    }

    initializeUserAccount = (userAccount) => {
        if (userAccount.todos) {
            this.userAccount = userAccount;
            return;
        }

        this.todoDataService.getAllTodos()
            .subscribe(this.initializeUserWithDefaultTodos);
    }

    initializeUserWithDefaultTodos = (defaultTodos) => {
        this.userAccount.todos = defaultTodos;
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

    login() {
        this.af.auth.login()
    }

    logout() {
        this.af.auth.logout();
    }
}
