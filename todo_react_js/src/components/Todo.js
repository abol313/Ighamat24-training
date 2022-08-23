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



    render(){
        return (
            <div class="todo-item">
                <p class="title">{this.state.title}</p>
                <p class="description">{this.state.description}</p>
                <p class="due-at">Due at: {this.state.dueAt}</p>
                <p class="done-at">Done at: {this.state.doneAt}</p>
                <input type="checkbox" onClick=""/>
            </div>
        );
    }
}