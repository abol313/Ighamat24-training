import React from 'react';
import TodoModel from '../scripts/TodoModel';
import Alert from '../modules/Alert/Alert';
import TodoFormUpdateSubmitLogo from '../components/icons/pen-to-square-solid';
import TodoFormUpdateResetLogo from '../components/icons/rotate';
import {useParams} from 'react-router-dom';


function withRouteParams(Component){
    return function(props){
        const params = useParams();
        return (
            <Component {...props} params={params}/>
        );
    };
}

class UpdateTodoView extends React.Component{
    constructor(props){
        super(props);

        const id = this.props.params.id;
        const todo = TodoModel.query().where('id', id).get()[0];
        console.log(id,todo,TodoModel.query().where('id', id).get());
        this.state = {
            title: todo.title,
            description: todo.description,
            dueAt: todo.due_at,
            doneAt: todo.done_at,

            createdAt: todo.created_at,
            updatedAt: todo.updated_at,
        };
    }


    updateTodo(){
        let updatedAt = new Date().toISOString();
        this.setState({
            updatedAt,
        });

        TodoModel.update(this.props.params.id ,{
            title: this.state.title,
            description: this.state.description,
            due_at: this.state.dueAt,
            done_at: this.state.doneAt,

            created_at: this.state.updatedAt,
            updated_at: updatedAt,
        });

        new Alert(
            "Success Edit",
            "Edited the todo",
            "Ok",
            "success"
        )
        .make()
        .show();
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
                <p className="form-title">Edit the Todo !</p>
                <label htmlFor="title">Todo's Title</label>
                <input id="title" class="title" placeholder="Pass your title" value={this.state.title} onChange={this.onChangeTitle.bind(this)}/>

                <label htmlFor="description">Todo's description</label>
                <input id="description" class="description" placeholder="Pass your description" value={this.state.description} onChange={this.onChangeDescription.bind(this)}/>

                <label htmlFor="due">Todo's Due Date & Time</label>
                <input id="due" type="datetime-local" class="due" value={this.getDateAsInputLocalDateTime(new Date(this.state.dueAt))} onChange={this.onChangeDue.bind(this)}/>

                <div class="submit" onClick={this.updateTodo.bind(this)}>
                    <p>Edit Todo</p>
                    <TodoFormUpdateSubmitLogo class="submit-logo"/>
                </div>
            </div>
        );
    }
}

export default withRouteParams(UpdateTodoView);