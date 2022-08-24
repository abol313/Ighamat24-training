import React from 'react';
import TodoModel from '../scripts/TodoModel';
import Alert from '../modules/Alert/Alert';

export default class CreateTodo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
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
            due_at: this.state.dueAt,
            done_at: this.state.doneAt,

            created_at: createdAt,
            updated_at: this.state.updatedAt,
        });

        new Alert(
            'Todo Created',
            'The todo successfully created, you can now go to the todos list and see your todos',
            'Ok',
            'success'
        ).make().show();
    }

    getDateTimeAsInputValue(date){
        return date.toISOString();
    }

    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeDue(e){
        let date = new Date();
        date.setTime(new Date(e.target.value).getTime());
        this.setState({
            dueAt: date
        });
    }

    getDateAsInputLocalDateTime(date){
        return date.toLocaleString('swe');
    }

    render(){
        return (
            <div className="form-box">
                
                <label htmlFor="input-title">Todo's Title</label>
                <input id="input-title" placeholder="Pass your title" value={this.state.title} onChange={this.onChangeTitle.bind(this)}/>

                <label htmlFor="input-description">Todo's description</label>
                <input id="input-description" placeholder="Pass your description" value={this.state.description} onChange={this.onChangeDescription.bind(this)}/>

                <label htmlFor="input-date">Todo's Due Date & Time</label>
                <input id="input-date" type="datetime-local" value={this.getDateAsInputLocalDateTime(new Date(this.state.dueAt))} onChange={this.onChangeDue.bind(this)}/>

                <button onClick={this.createTodo.bind(this)}>Add Todo</button>
            </div>
        );
    }
}