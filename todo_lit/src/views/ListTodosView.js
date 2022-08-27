import { LitElement, html, css, unsafeCSS } from "lit";
import {repeat} from 'lit/directives/repeat.js';
import TodoModel from "../scripts/TodoModel";
import "../components/TodoFilter";
import "../components/Todo";
import mainStyle from "../assets/styles/main.scss";

window.TodoModel = TodoModel;

// for(let i=0; i<100; i++){
//     let dueDate = makeRandomlyDate(2022,7);
//     TodoModel.create({
//         title: 'title '+i,
//         description: 'description '+i,
//         due_at: dueDate,
//         done_at: null,

//         created_at:dueDate - 1e3 * 60 * 60 * 24 * 3,
//         updated_at:dueDate - 1e3 * 60 * 60 * 24 * 2,
//     });
// }

function makeRandomlyDate(year=null , month=null, day=null){
    let date = new Date();
    date.setFullYear(year || Math.random()*1000+1971);
    date.setMonth(month || Math.random()*12);
    date.setDate(day || Math.random()*29);
    return date;
}
export default class ListTodosView extends LitElement {
    static styles = css`${unsafeCSS(mainStyle)}`;

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

    onTodoStatusChanged(){
        this.requery();
        this.setFilterCallback(this.filterCallback);
    }

    setFilterCallback(filterCallback){

        // debugger;

        console.log('setFilterCallback',filterCallback(this.todos));
        
        this.filterCallback = filterCallback;

        // this.forceUpdate();
        // this.requestUpdate();

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

    // getTodosElements(){
    //     return this.getTodos().map( todo => 
    //         (<Todo key={todo.id} todo={todo} searchText={this.searchText} forceUpdate={this.forceUpdate.bind(this)} onRequery={this.requery.bind(this)}/>)
    //     );
    // }


    getTodosElements(){
        repeat
        return html`
            ${ repeat(
                this.getTodos(), 
                todo=>todo.id,
                todo => html`<todo-item class="todo-item" todo="${JSON.stringify(todo)}" @force-update=${this.onTodoStatusChanged}></todo-item>`
            ) }
        `;
    }

    onFilter(event){
        console.log('list-todos-view@onFilter',event);
        this.setFilterCallback(event.detail.filterCallback);
    }

    onSearch(event){
        this.searchText = event.searchText;
    }

    render(){
        return html`
            <todo-filter @filter=${this.onFilter} ></todo-filter>

            <div class="todos">
                ${this.getTodosElements()}
            </todos>
        `;
    }
}

customElements.define('list-todos-view', ListTodosView);