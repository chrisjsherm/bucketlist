export class Todo {
    title: string = '';
    complete: boolean = false;

    constructor (values: Object = {}) {
        Object.assign(this, values);
    }
}
