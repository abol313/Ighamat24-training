import React from 'react';
import TodoModel from '../scripts/TodoModel';
import Alert from '../modules/Alert/Alert';

export default class CreateTodo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: null,
            description: null,
            dueAt: new Date().toISOString(),
            doneAt: null,

            createdAt: null,
            updatedAt: null,
        };
    }

    createTodo(){

        let createdAt = new Date().toISOString();
        this.setState({
            createdAt,
        });

        TodoModel.create({
            title: this.state.title,
            description: this.state.description,
            due_at: this.dueAt,
            done_at: this.doneAt,

            created_at: this.createdAt,
            updated_at: this.updatedAt,
        });

        new Alert(
            'Todo Created',
            'The todo successfully created, you can now go to the todos list and see your todos',
            'Ok',
            'success'
        ).make().show();
    }

    render(){
        return (
            <div className="form-box">
                
                <label htmlFor="input-title">Todo's Title</label>
                <input id="input-title" placeholder="Pass your title"/>

                <label htmlFor="input-description">Todo's description</label>
                <input id="input-description" placeholder="Pass your description"/>

                <label htmlFor="input-date">Todo's Due Date & Time</label>
                <input id="input-date" type="datetime-local"/>

                <button onClick={}>Add Todo</button>
            </div>
        );
    }
}