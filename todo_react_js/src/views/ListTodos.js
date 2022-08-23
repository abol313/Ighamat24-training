import React from 'react';
import Todo from "../components/Todo";
import TodoModel from "../scripts/TodoModel";

export default class ListTodos extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div class="todos">
                <Todo todo={
                    {
                        id:'2',
                        title:'title',
                        description:'descripiton',
                        due_at:"due",
                        done_at:"done",
                        created_at:'ewefwd',
                        updated_at:'wfwdluwfg',

                    }
                }/>
                <p>joujoij</p>
            </div>
        );
    }
}