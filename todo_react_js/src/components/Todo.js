import React from 'react';
import TodoModel from '../scripts/TodoModel';
import Check from './icons/check';
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


    toggleStatus(){
        let newDoneAt = this.state.doneAt ? null : new Date().toISOString();
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
                <div className="nav">
                    <p className="title">{this.state.title}</p>
                    <div className="settings">
                        <div className={"status-logo "+(this.state.doneAt && "todo-done")} onClick={this.toggleStatus.bind(this)}>
                            {this.state.doneAt && <Check/>}
                        </div>
                    </div>
                </div>
                <p className="description">{this.state.description}</p>
                <p className="due-at">Due at: {this.state.dueAt}</p>
                <p className="done-at">Done at: {this.state.doneAt}</p>
            </div>
        );
    }
}