// import CaretLeft from "./icons/caret-left";
// import CaretRight from "./icons/caret-right";
// import CheckLogo from "./icons/check";
// import FilterLogo from "./icons/filter";
import { LitElement, html } from "lit";
export default class TodoFilter extends LitElement {
    static properties = {
        filters:{state:true},

        filterDate:{state:true},
        searchText:{state:true},


    };
    constructor() {
        super();


        this.filterDate = new Date();
        this.searchText = '';


        this.filters = {
            /**
             * filter :
             * {
             *     ! The order of filters in filters object is important
             *     ! You should have either pipeItem or pipeAll of every filter
             *     pipeEach: item=>item //gets every item and will be passed on every item and return piped item
             *     pipeAll: items=>items //gets all items and returns piped items
             *     enabled: true/false //this filter pass or not on filtering
             *     isIncluded: true/false //use in pipeEach mode and include means in addition or plus others while exclude means just others
             * }
             */

            done: {
                pipeEach: todo => todo.done_at !== null,
                isIncluded: true,
                enabled: false,
            },

            undone: {
                pipeEach: todo => todo.done_at === null,
                isIncluded: true,
                enabled: true,
            },


            date: {
                pipeAll: todos => {
                    return todos.filter(todo => new Date(todo.due_at).toDateString() === this.getFilterDate().toDateString());
                },
                enabled: true,
            },


            sort: {
                pipeAll: todos => todos.sort((a, b) => this.sortLastCreate(a, b, true)),
                enabled: true,
            },


            search:{
                pipeAll: todos => this.passSearch(todos),
                enabled:false
            },

            sortAscLastEdit:{
                pipeAll: todos => todos.sort((a,b)=>this.sortLastEdit(a, b, false)),
                enabled: false,
            },
            
            sortDescLastEdit:{
                pipeAll: todos => todos.sort((a,b)=>this.sortLastEdit(a, b, true)),
                enabled: true,
            },

            sortAscLastDue:{
                pipeAll: todos => todos.sort((a,b)=>this.sortLastDue(a, b, false)),
                enabled: false,
            },
            
            sortDescLastDue:{
                pipeAll: todos => todos.sort((a,b)=>this.sortLastDue(a, b, true)),
                enabled: false,
            },


            sortAscLastDone:{
                pipeAll: todos => todos.sort((a,b)=>this.sortLastDone(a, b, false)),
                enabled: false,
            },
            
            sortDescLastDone:{
                pipeAll: todos => todos.sort((a,b)=>this.sortLastDone(a, b, true)),
                enabled: false,
            },



        };




    }



    connectedCallback() {
        super.connectedCallback();
        this.filter();
    }

    onFilter(){
        this.dispatchEvent(new CustomEvent('filter',{
            bubbles:true, 
            composed:true,
            detail:{

                filterCallback:this.filterCallback.bind(this)
            }
        }));
    }

    onSearch(){
        this.dispatchEvent(new CustomEvent('search',{
            bubbles:true, 
            composed:true,
            searchText: this.searchText,
        }));
    }

    filter() {
        // let callback = this.filterCallback
        console.log('done filter',this.filters.done);
        this.onFilter(this.filterCallback.bind(this));
    }

    passSearch(todos){
        console.log(this.searchText);
        // debugger;
        let regex = new RegExp(this.searchText.replaceAll(/\s/g,'').split('').join('.*'),'i');
        return todos.filter(todo => regex.test(todo.title));
    }

    onSearchChange(event){
        this.filters.search.enabled = !!(event.target.value + this.searchText).trim();
        this.searchText = event.target.value;

        this.searchText = this.searchText;
        this.filters = this.filters;

        if(!this.filters.search.enabled)
            return;
        this.onSearch(this.searchText);
        this.filter();
    }


    setSort(sort){
        this.filters.sortAscLastDone.enabled = false;
        this.filters.sortDescLastDone.enabled = false;

        this.filters.sortAscLastDue.enabled = false;
        this.filters.sortDescLastDue.enabled = false;

        this.filters.sortAscLastEdit.enabled = false;
        this.filters.sortDescLastEdit.enabled = false;

        this.filters[sort].enabled = true

        this.filter();
    }

    sortLastEdit(todoA, todoB, isDesc=true){
        let todoADate = new Date(todoA.updated_at || todoA.created_at);
        let todoBDate = new Date(todoB.updated_at || todoB.created_at);

        if(isDesc)
            return todoADate.getTime() > todoBDate.getTime() ? -1:1;
        else
            return todoADate.getTime() < todoBDate.getTime() ? -1:1;

    }

    sortLastDue(todoA, todoB, isDesc=true){
        let todoADate = new Date(todoA.due_at);
        let todoBDate = new Date(todoB.due_at);

        if(isDesc)
            return todoADate.getTime() > todoBDate.getTime() ? -1:1;
        else
            return todoADate.getTime() < todoBDate.getTime() ? -1:1;
    }

    sortLastDone(todoA, todoB, isDesc=true){
        let todoADate = new Date(todoA.done_at);
        let todoBDate = new Date(todoB.done_at);

        if(isDesc)
            return todoADate.getTime() > todoBDate.getTime() ? -1:1;
        else
            return todoADate.getTime() < todoBDate.getTime() ? -1:1;
    }

    sortLastCreate(todoA, todoB, isDesc = true) {
        let todoADate = new Date(todoA.created_at);
        let todoBDate = new Date(todoB.created_at);

        if (isDesc)
            return todoADate.getTime() > todoBDate.getTime() ? -1 : 1;
        else
            return todoADate.getTime() < todoBDate.getTime() ? -1 : 1;

    }




    filterCallback(orgTodos) {
        let filteredTodos = [];
        let unfilteredTodos = [...orgTodos];

        // debugger;
        for (const filter of Object.values(this.filters)) {
            if (!filter.enabled) continue;

            if (filter.pipeEach) {

                for (let i = 0; i < unfilteredTodos.length; i++) {

                    let unfilteredTodo = unfilteredTodos[i];

                    let piped = filter.pipeEach(unfilteredTodo);
                    //if it is boolean handled existance of item else the returned value from piping will be passed
                    if (piped === true || piped === false) {
                        if (piped === true) {
                            if (filter.isIncluded)
                                filteredTodos.push(unfilteredTodo);
                            unfilteredTodos.splice(i--, 1);
                        } else if (!filter.isIncluded) {
                            filteredTodos.push(unfilteredTodo);
                        }
                    } else {
                        filteredTodos.push(piped);
                        unfilteredTodos.splice(i--, 1);
                    }

                }


            } else if (filter.pipeAll) {
                filteredTodos = filter.pipeAll(filteredTodos);
            }
        }


        return filteredTodos;

    }

    toggleFilterDone() {
        // debugger;
        console.log('toggle done');
        this.filters.done.enabled = !this.filters.done.enabled;
        this.filters = this.filters;
        this.filter();
    }

    getFilterDate() {
        return this.filterDate;
    }

    goNextDay() {
        this.filterDate.setTime(this.filterDate.getTime() + 1e3 * 60 * 60 * 24);
        this.filterDate = new Date(this.filterDate);
        this.filter();
        this.requestUpdate();
    }

    goPrevDay() {
        this.filterDate.setTime(this.filterDate.getTime() - 1e3 * 60 * 60 * 24);
        this.filterDate = new Date(this.filterDate);
        this.filter();
    }

    onFilterDate(event) {
        const [year, month, day] = event.target.value.split('-');
        console.log(event.target.value);
        this.filterDate.setFullYear(+year);
        this.filterDate.setMonth(+month-1);
        this.filterDate.setDate(+day);
        this.filterDate = new Date(this.filterDate);
        this.filter();
        console.log(this.filterDate);
    }

    onFilterDone(event) {
        // console.log('onFilterDone', event.target.checked);
        this.toggleFilterDone(event.target.checked);
    }

    render() {
        return html`
            <div class="filter-box">
                <div class="block">
                    <div class="title">
                        <h2>Filter</h2>
                        <FilterLogo />
                    </div>

                    <div class="${'status ' + (this.filters.done.enabled && 'status-done')}">
                        <p>Done todos</p>
                        <input type="checkbox" ?checked=${console.log(this.filters.done) || this.filters.done.enabled} @click=${this.toggleFilterDone} />
                    </div>

                    <div class="status status-done filter-date-picked">
                        <label htmlFor="filter-date">Date</label>
                        <button @click="${this.goPrevDay}" class="prev-day"><CaretLeft />-</button>
                        <input id="filter-date" type="date" .value="${this.filterDate.toLocaleDateString('swe')}" @change=${this.onFilterDate}/>
                        <button @click="${this.goNextDay}" class="next-day"><CaretRight />+</button>
                    </div>
                </div>

            </div>
        `;
    }
}

customElements.define('todo-filter', TodoFilter);