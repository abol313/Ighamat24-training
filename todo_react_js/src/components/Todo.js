import React from 'react';
import TodoModel from '../scripts/TodoModel';

export default class Todo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.todo.id,
            title: this.props.todo.title,
            description: this.props.todo.description,
            doneAt: this.props.todo.done_at,

            dueAt: this.props.todo.due_at,
            createdAt: this.props.created_at,
            updatedAt: this.props.updated_at,
        };
    }


    toggleStatus(event){
        let newDoneAt = !event.target.checked || this.state.doneAt ? null : new Date().toISOString();
        this.setState({
            doneAt: newDoneAt
        });

        console.log('todomodel@update',this.state.id, newDoneAt);
        TodoModel.update(this.state.id,{
            done_at: newDoneAt
        });

        this.props.todo.done_at = newDoneAt;
        
        this.props.forceUpdate();
    }

    render(){
        return (
            <div className="todo-item">
                <p className="title">{this.state.title}</p>
                <p className="description">{this.state.description}</p>
                <p className="due-at">Due at: {this.state.dueAt}</p>
                <p className="done-at">Done at: {this.state.doneAt}</p>
                <input type="checkbox" onChange={this.toggleStatus.bind(this)} checked={!!this.state.doneAt}/>
            </div>
        );
    }
}