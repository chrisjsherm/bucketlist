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

    constructor(
        public af: AngularFire,
        private router: Router,
        private todoDataService: TodoDataService
    ) {
        this.af.auth.subscribe(user => {
            if (user) {
                // user logged in
                this.user = user;
                let defaultTodos = this.todoDataService.getAllTodos();

                let ref = this.af.database.object(
                    '/api/user-accounts/' +
                    user.uid
                );

                // let defaultTodosArr = [];
                // defaultTodos.forEach(todos => {
                //     ref.set(todos);
                // });
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

    login() {
        this.af.auth.login()
    }

    logout() {
        this.af.auth.logout();
    }
}
