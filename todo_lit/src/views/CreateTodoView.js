import { LitElement, html } from "lit";
import TodoModel from "../scripts/TodoModel";
// import Alert from "../modules/Alert";

export default class CreateTodoView extends LitElement {
    static properties = {
        title:{state:true},
        description:{state:true},
        dueAt:{state:true},
        doneAt:{state:true},

        createdAt:{state:true},
        updatedAt:{state:true},
    };
    constructor(){
        super();
        this.title = null;
        this.description= null;
        this.dueAt = new Date();
        this.doneAt = null;

        this.createdAt = null;
        this.updatedAt = null;
    }

    createTodo(){

        let createdAt = new Date().toISOString();
        this.createdAt = createdAt;

        TodoModel.create({
            title: this.title,
            description: this.description,
            due_at: this.dueAt,
            done_at: this.doneAt,

            created_at: createdAt,
            updated_at: this.updatedAt,
        });

        alert('created!');
    }

    onChangeDue(e){
        let date = new Date();
        date.setTime(new Date(e.target.value).getTime());
        this.dueAt = date;

    }

    render(){
        return html`
        <div>
        <label for="title">title</label>
        <input id="title" placeholder="title" .value=${this.title} @change=${e=>this.title=e.target.value}/>

        <label for="description">description</label>
        <input id="description" placeholder="description" .value=${this.description} @change=${e=>this.description=e.target.value}/>

        <label for="due">due</label>
        <input id="due" placeholder="due" .value=${new Date(this.dueAt).toLocaleDateString('swe')} @change=${this.onChangeDue}/>


        <button @click=${this.createTodo}>Create todo !</button>
        </div>
        `;
    }
}

customElements.define('created-todo-view', CreateTodoView);