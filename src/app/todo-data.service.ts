import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class TodoDataService {

    angularFire: AngularFire;
    todos: FirebaseListObservable<Todo[]>;

    constructor(angularFire: AngularFire) {
        this.angularFire = angularFire;
        this.todos = angularFire.database.list('/api/todos');
    }

    // POST /todos.
    addTodo(todo: Todo): TodoDataService {
        this.todos.push(todo);

        return this;
    }

    // DELETE /todos/:id.
    deleteTodoById(id: string): TodoDataService {
        this.todos.remove(id);

        return this;
    }

    // PUT /todos/:id.
    updateTodoById(id: string, values: Object = {}): FirebaseObjectObservable<Todo> {
        let todo = this.getTodoById(id);

        if (!todo) {
            return null;
        }

        todo.set(values);

        return todo;
    }

    // GET /todos.
    getAllTodos(): FirebaseListObservable<Todo[]> {
        return this.todos;
    }

    // GET /todos/:id.
    getTodoById(id: string): FirebaseObjectObservable<Todo> {
        return this.angularFire.database.object('/api/todos/' + id);
    }

    // Toggle todo complete.
    toggleTodoComplete(id: string, isComplete: boolean = true) {
        let todoToUpdate = this.getTodoById(id);
        
        todoToUpdate.update({complete: isComplete});

        return todoToUpdate;
    }
}
