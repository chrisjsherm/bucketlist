import { AngularFire, AuthProviders } from 'angularfire2';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';
import { UserAccount } from '../user-account';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: [TodoDataService],
})

export class TodoListComponent implements OnInit {

    // Properties.
    userAccount = new UserAccount();
    UserAccountUrl = '/api/user-accounts/';
    incompleteTodoCount: number;
    newTodo: Todo = new Todo();

    // Constructors.
    constructor(
        private af: AngularFire,
        private todoDataService: TodoDataService,
    ) {
        this.af.auth.subscribe(this.onFirebaseAuth);
    }

    // Activation.
    ngOnInit() {
    }

    // Private methods.
    addTodo(newTodo: Todo) {
        // Save the existing item.
        this.todoDataService.addTodo(newTodo);

        // Initialize a new object so we can add more items.
        this.newTodo = new Todo();
    }

    initializeUserAccount = (userAccount) => {
        
        this.userAccount.uid = userAccount.$key;

        if (userAccount.$exists()) {
            this.userAccount = userAccount;
        } else {
            this.saveNewUserAccount();
        }
        
        
        if (userAccount.todos) {
            this.setIncompleteTodoCount(this.userAccount.todos);
        } else {
            this.todoDataService.getAllTodos()
                .subscribe(this.initializeUserWithDefaultTodos);
        }
    }

    initializeUserWithDefaultTodos = (defaultTodos) => {
        this.userAccount.todos = defaultTodos;
        this.saveNewUserAccount();

        this.setIncompleteTodoCount(this.userAccount.todos);
    }

    onFirebaseAuth = (firebaseAuth) => {
        if (firebaseAuth) {
            // User is logged in.
            this.af.database.object(
                this.UserAccountUrl +
                firebaseAuth.uid
            ).subscribe(this.initializeUserAccount);
        }
        else {
            // User is not logged in.
            this.userAccount = new UserAccount();
        }
    }

    removeTodo(todo) {
        this.todoDataService.deleteTodoById(todo.$key);
    }

    saveNewUserAccount() {
        this.af.database.object(
            this.UserAccountUrl +
            this.userAccount.uid
        ).set(this.userAccount);
    }

    setIncompleteTodoCount = (todos) => {
        this.incompleteTodoCount = todos
            .filter(todo => !todo.complete).length;
    }

    toggleTodoComplete(todo, idx) {
        this.userAccount.todos[idx].complete = !todo.complete;
        
        this.updateUserAccount();
    }

    updateUserAccount = () => {
        this.af.database.object(
            this.UserAccountUrl +
            this.userAccount.uid
        ).update(this.userAccount);
    }
}
