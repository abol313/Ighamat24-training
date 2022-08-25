import React from 'react';
import Todo from "../components/Todo";
import TodoFilter from '../components/TodoFilter';
import TodoModel from "../scripts/TodoModel";
window.TodoModel = TodoModel;

// for(let i=0; i<1000; i++){
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
export default class ListTodos extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos : TodoModel.all(),
            filterCallback : (todos)=>todos,
            searchText : '',
        };
    }


    setFilterCallback(filterCallback){

        // debugger;

        console.log(filterCallback(this.state.todos));
        this.setState({
            'filterCallback': filterCallback
        });

        this.forceUpdate();

        return this;
    }

    onSearch(searchText){
        console.log('onSearch:', searchText);
        this.setState({
            searchText
        });
    }

    requery(){
        this.setState({
            todos: TodoModel.all()
        });
    }

    getTodos(){
        // return this.state.todos;
        console.log( this.state.filterCallback(this.state.todos));
        return this.state.filterCallback(this.state.todos);
    }

    getTodosElements(){
        return this.getTodos().map( todo => 
            (<Todo key={todo.id} todo={todo} searchText={this.state.searchText} forceUpdate={this.forceUpdate.bind(this)} onRequery={this.requery.bind(this)}/>)
        );
    }

    render(){
        return (
            <div>
                <TodoFilter className="filter-box" filter={this.setFilterCallback.bind(this)} onSearch={this.onSearch.bind(this)}/>
                <div className="todos">

                    {this.getTodosElements()}
                </div>
            </div>
        );
    }
}