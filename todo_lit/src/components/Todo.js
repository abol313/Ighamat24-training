import { css, html, LitElement } from "lit";

export class TodoItem extends LitElement {
    static properties = {
        todo:{'type':Object},
        searchText:{},

        id:{state:true},
        title:{state:true},
        description:{state:true},
        dueAt:{state:true},
        doneAt:{state:true},

        createdAt:{state:true},
        updatedAt:{state:true},

        shownCloserTime:{state:true},
    }

    constructor(){
        super();

        this.id = this.todo.id;
        this.title = this.todo.title;
        this.description = this.todo.description;
        this.dueAt = this.todo.due_at;
        this.doneAt = this.todo.done_at;

        this.createdAt = this.todo.created_at;
        this.updatedAt = this.todo.updated_at;
    }

    forceUpdate(){
        this.dispatchEvent(new CustomEvent('onForceUpdate', {
            bubbles:true,
            composed:true,
        }));
    }

    toggleStatus(){
        let newDoneAt = this.doneAt ? null : new Date().toISOString();
        
        this.doneAt = newDoneAt;

        console.log('todomodel@update',this.id, newDoneAt);
        TodoModel.update(this.id,{
            done_at: newDoneAt
        });

        this.todo.done_at = newDoneAt;
        
        this.forceUpdate();
    }

    get dueAt(){
        return this.dateToString(new Date(this.dueAt));
    }
    get doneAt(){
        return this.dateToString(new Date(this.doneAt));
    }
    get lastEditAt(){
        return this.dateToString(new Date(this.updatedAt || this.createdAt));
    }
    
    showCloserTime(){
        this.shownCloserTime = true;
    }

    showNearlyTime(){
        this.shownCloserTime = false;
    }

    dateToString(date, exact = false) {
        if (!date)
            return date;
        exact = this.shownCloserTime;
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
        if (!this.searchText)
            return text;
        if (this.searchText == text)
            return this.getStyleArea(text, true);
        // this.searchText = this.searchText.toLowerCase();
        let orgText = text;
        let regex = new RegExp("(" + this.searchText.replaceAll(/\s/g, "").split("").join(").*?(") + ")", "ig");
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
        console.log("#", this.searchText, ":", this.title, "#", "Style as search..", styledText);
        return styledText;
    }
    getStyleArea(text, isExact = false) {
        return `<ins class="search-area${(isExact ?"-exact":"")}">${text}</ins>`;
    }

    getTitle(){
        if(!this.searchText.trim())
            return this.title;
        return this.styleSearchArea(this.title);
    }

    deleteTodo(){
        console.log(this.id);
        TodoModel.delete(this.id);
        this.onRequery();
    }



    render(){
        return html`
        <div class="todo-item" @mouseOver=${this.showCloserTime} @mouseOut=${this.showNearlyTime}>
        <div class="nav">
            <p class="title">${this.getTitle()}</p>
            <div class="settings">
                <div class="delete-logo" title="delete the todo" @click=${this.deleteTodo}>
                    <DeleteLogo class="delete-logo"/>
                </div>

                <div class="${"status-logo "+(this.state.doneAt && "todo-done")}" @click=${this.toggleStatus}>
                    ${this.state.doneAt && <Check/>}
                </div>
            </div>
        </div>
        <p class="description">${this.description}</p>
        <p class="due-at">Due at: ${this.dueAt}</p>
        <p class="last-edit">Last edit at: ${this.lastEditAt}</p>
        <p class="done-at">${this.doneAt? `Done at: ${this.doneAt}`: 'Todo is not done yet!'}</p>

        `;
    }
}

customElements.define('todo-item',TodoItem);