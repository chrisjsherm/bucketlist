import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(public af: AngularFire, private router: Router,) { }

    ngOnInit() {
    }

    login() {
        this.af.auth.login()
        .then(this.redirectToTodoList);
    }

    logout() {
        this.af.auth.logout();
    }

    redirectToTodoList() {
        this.router.navigate(['/']);
    }
}
