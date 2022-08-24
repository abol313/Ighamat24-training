import React from 'react';
import TodoModel from '../scripts/TodoModel';
import Alert from '../modules/Alert/Alert';
import TodoFormCreateSubmitLogo from '../components/icons/todo-form-create-submit-logo';


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
                
                <label htmlFor="title">Todo's Title</label>
                <input id="title" class="title" placeholder="Pass your title" value={this.state.title} onChange={this.onChangeTitle.bind(this)}/>

                <label htmlFor="description">Todo's description</label>
                <input id="description" class="description" placeholder="Pass your description" value={this.state.description} onChange={this.onChangeDescription.bind(this)}/>

                <label htmlFor="due">Todo's Due Date & Time</label>
                <input id="due" type="datetime-local" class="due" value={this.getDateAsInputLocalDateTime(new Date(this.state.dueAt))} onChange={this.onChangeDue.bind(this)}/>

                <div class="submit" onClick={this.createTodo.bind(this)}>
                    <p>Create Todo</p>
                    <TodoFormCreateSubmitLogo class="submit-logo"/>
                </div>
            </div>
        );
    }
}