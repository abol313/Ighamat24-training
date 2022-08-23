import React from 'react';

export default class Todo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            id: this.props.todo.id,
            title: this.props.todo.title,
            description: this.props.todo.description,

            dueAt: this.props.todo.due_at,
            createdAt: this.props.created_at,
            updatedAt: this.props.updated_at,
        };
    }


    toggleStatus(){

    }

    render(){
        return (
            <div className="todo-item">
                <p className="title">{this.state.title}</p>
                <p className="description">{this.state.description}</p>
                <p className="due-at">Due at: {this.state.dueAt}</p>
                <p className="done-at">Done at: {this.state.doneAt}</p>
                <input type="checkbox" onClick={this.toggleStatus.bind(this)}/>
            </div>
        );
    }
}