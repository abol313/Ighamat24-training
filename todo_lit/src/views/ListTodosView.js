import { LitElement } from "lit";
import TodoModel from "../scripts/TodoModel";
import "../components/TodoFilter";
import "../components/Todo";

window.TodoModel = TodoModel;

for(let i=0; i<1000; i++){
    let dueDate = makeRandomlyDate(2022,7);
    TodoModel.create({
        title: 'title '+i,
        description: 'description '+i,

        due_at: dueDate,
        done_at: null,

        created_at:dueDate - 1e3 * 60 * 60 * 24 * 3,
        updated_at:dueDate - 1e3 * 60 * 60 * 24 * 2,
    });
}
export default class ListTodosView extends LitElement {
    static properties = {
        orgTodos: {state:true},
        todos: {state:true},

        filterCallback: {state:true},
        searchText: {state:true},
    };

    constructor(){
        super();
        this.todos = TodoModel.all();
        this.filterCallback = (todos)=>todos;
        this.searchText = '';
        
    }


    setFilterCallback(filterCallback){

        // debugger;

        console.log(filterCallback(this.todos));
        
        this.filterCallback = filterCallback;

        // this.forceUpdate();

        return this;
    }

    onSearch(searchText){
        console.log('onSearch:', searchText);

        this.searchText = searchText;
    }

    requery(){

        this.todos = TodoModel.all();
    }

    getTodos(){
        // return this.todos;
        console.log( this.filterCallback(this.todos));
        return this.filterCallback(this.todos);
    }

    getTodosElements(){
        return this.getTodos().map( todo => 
            (<Todo key={todo.id} todo={todo} searchText={this.searchText} forceUpdate={this.forceUpdate.bind(this)} onRequery={this.requery.bind(this)}/>)
        );
    }


    getTodosElements(){
        return html`
            ${ this.getTodos().map( todo => html`<todo-item todo="${JSON.stringify(todo)}" @forceUpdate="${()=>this.requestUpdate()}"></todo-item>` ) }
        `;
    }

    onFilter(event){
        this.setFilterCallback(event.filterCallback);
    }

    onSearch(event){
        this.searchText = event.searchText;
    }

    render(){
        return html`
            <todo-filter onFilter="${this.onFilter}"></todo-filter>

            <div class="todos">
                ${this.getTodosElements()}
            </todos>
        `;
    }
}

customElements.define('list-todos-view', ListTodosView);