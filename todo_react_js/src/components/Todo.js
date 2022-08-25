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
            createdAt: this.props.todo.created_at,
            updatedAt: this.props.todo.updated_at,

            shownCloserTime: false,
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

    get dueAt(){
        return this.dateToString(new Date(this.state.dueAt));
    }
    get doneAt(){
        return this.dateToString(new Date(this.state.doneAt));
    }
    get lastEditAt(){
        return this.dateToString(new Date(this.state.updatedAt || this.state.createdAt));
    }
    
    showCloserTime(){
        this.setState({
            shownCloserTime: true
        });
    }

    showNearlyTime(){
        this.setState({
            shownCloserTime: false
        });
    }

    dateToString(date, exact = false) {
        if (!date)
            return date;
        exact = this.state.shownCloserTime;
        // console.log(date);
        if (exact)
            return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let nowDate = new Date();
        let last_edit_out = "";
        switch (true) {
            case nowDate.getFullYear() != date.getFullYear():
                last_edit_out += `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
                break;
            case nowDate.getMonth() != date.getMonth():
                let diffMonth = nowDate.getMonth() - date.getMonth();
                last_edit_out += `${Math.abs(diffMonth)} month${Math.abs(diffMonth) > 1 ? "s" : ""} ${diffMonth < 0 ? "next" : "ago"}`;
                break;
            case nowDate.getDate() != date.getDate():
                let diffDate = nowDate.getDate() - date.getDate();
                last_edit_out += `${Math.abs(diffDate)} day${Math.abs(diffDate) > 1 ? "s" : ""} ${diffDate < 0 ? "next" : "ago"}`;
                break;
            case nowDate.getHours() != date.getHours():
                let diffHour = nowDate.getHours() - date.getHours();
                last_edit_out += `${Math.abs(diffHour)} hour${Math.abs(diffHour) > 1 ? "s" : ""} ${diffHour < 0 ? "next" : "ago"}`;
                break;
            case nowDate.getMinutes() != date.getMinutes():
                let diffMinute = nowDate.getMinutes() - date.getMinutes();
                last_edit_out += `${Math.abs(diffMinute)} minute${Math.abs(diffMinute) > 1 ? "s" : ""} ${diffMinute < 0 ? "next" : "ago"}`;
                break;
            case nowDate.getSeconds() != date.getSeconds():
                let diffSecond = nowDate.getSeconds() - date.getSeconds();
                last_edit_out += `${Math.abs(diffSecond)} second${Math.abs(diffSecond) > 1 ? "s" : ""} ${diffSecond < 0 ? "next" : "ago"}`;
                break;
            default:
                last_edit_out += "now";
        }
        return last_edit_out;
    }

    styleSearchArea(text) {
        if (!this.props.searchText)
            return text;
        if (this.props.searchText == text)
            return this.getStyleArea(text, true);
        // this.searchText = this.searchText.toLowerCase();
        let orgText = text;
        let regex = new RegExp("(" + this.props.searchText.replaceAll(/\s/g, "").split("").join(").*?(") + ")", "ig");
        let matches = text.matchAll(regex);
        let styledText = "";
        let pastIndex = 0;
        for (const match of matches) {
            console.log('match:',match);
            if (pastIndex !== match.index) {
                styledText += orgText.slice(pastIndex, pastIndex = match.index);
            }
            styledText += this.getStyleArea(orgText.slice(pastIndex, pastIndex += match[0].length));
        }
        styledText += orgText.slice(pastIndex);
        console.log(regex);
        console.log("#", this.props.searchText, ":", this.title, "#", "Style as search..", styledText);
        return styledText;
    }
    getStyleArea(text, isExact = false) {
        return `<ins class="search-area${(isExact ?"-exact":"")}">${text}</ins>`;
    }

    getTitle(){
        if(!this.props.searchText.trim())
            return this.state.title;
        return this.styleSearchArea(this.state.title);
    }

    render(){
        return (
            <div className="todo-item" onMouseOver={this.showCloserTime.bind(this)} onMouseOut={this.showNearlyTime.bind(this)}>
                <div className="nav">
                    <p className="title" dangerouslySetInnerHTML={{__html:this.getTitle()}}></p>
                    <div className="settings">
                        <div className={"status-logo "+(this.state.doneAt && "todo-done")} onClick={this.toggleStatus.bind(this)}>
                            {this.state.doneAt && <Check/>}
                        </div>
                    </div>
                </div>
                <p className="description">{this.state.description}</p>
                <p className="due-at">Due at: {this.dueAt}</p>
                <p className="last-edit">Last edit at: {this.lastEditAt}</p>
                <p className="done-at">{this.state.doneAt? `Done at: ${this.doneAt}`: 'Todo is not done yet!'}</p>
            </div>
        );
    }
}