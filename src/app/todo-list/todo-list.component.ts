import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoDataService } from '../todo-data.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.scss'],
    providers: [TodoDataService],
})
export class TodoListComponent implements OnInit {

    incompleteTodoCount: number;
    newTodo: Todo = new Todo();

    constructor(private todoDataService: TodoDataService) {
        this.todos.subscribe(result => {
            this.incompleteTodoCount = result
                .filter(todo => !todo.complete).length;
        })
    }

    ngOnInit() {
    }

    addTodo(newTodo: Todo) {
        // Save the existing item.
        this.todoDataService.addTodo(newTodo);

        // Initialize a new object so we can add more items.
        this.newTodo = new Todo();
    }

    get todos() {
        return this.todoDataService.getAllTodos();
    }

    removeTodo(todo) {
        this.todoDataService.deleteTodoById(todo.$key);
    }

    toggleTodoComplete(todo) {
        this.todoDataService.toggleTodoComplete(todo.$key, !todo.complete);
    }

}
