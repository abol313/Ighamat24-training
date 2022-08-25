import React from "react";
import CaretLeft from "./icons/caret-left";
import CaretRight from "./icons/caret-right";
import CheckLogo from "./icons/check";
import FilterLogo from "./icons/filter";
export default class TodoFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            filterDate: new Date(),


            filters: {
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

                // sort: {
                //     pipeAll: todos => todos.sort((a, b) => this.sortLastCreate(a, b, true)),
                //     enabled: true,
                // },

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



            },



        };
    }

    componentDidMount() {
        this.filter();
    }

    filter() {
        // let callback = this.state.filterCallback
        this.props.filter(this.filterCallback.bind(this));
    }

    setSort(sort){
        this.state.filters.sortAscLastDone.enabled = false;
        this.state.filters.sortDescLastDone.enabled = false;

        this.state.filters.sortAscLastDue.enabled = false;
        this.state.filters.sortDescLastDue.enabled = false;

        this.state.filters.sortAscLastEdit.enabled = false;
        this.state.filters.sortDescLastEdit.enabled = false;

        this.state.filters[sort].enabled = true

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
        for (const filter of Object.values(this.state.filters)) {
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

    toggleFilterDone(isDone = null) {
        this.state.filters.done.enabled = isDone === null ? !this.state.filters.done.enabled : isDone;
        this.setState({
            filters: this.state.filters
        });
        this.filter();
    }

    getFilterDate() {
        return this.state.filterDate;
    }

    goNextDay() {
        this.state.filterDate.setTime(this.state.filterDate.getTime() + 1e3 * 60 * 60 * 24);
        this.setState({
            filterDate: this.state.filterDate,
        });
        this.filter();
    }

    goPrevDay() {
        this.state.filterDate.setTime(this.state.filterDate.getTime() - 1e3 * 60 * 60 * 24);
        this.setState({
            filterDate: this.state.filterDate,
        });
        this.filter();
    }

    onFilterDate(event) {
        const [year, month, day] = event.target.value.split('-');
        this.state.filterDate.setFullYear(year);
        this.state.filterDate.setMonth(month);
        this.state.filterDate.setDate(day);
        this.setState({
            filterDate: this.state.filterDate
        });
        this.filter();
    }

    onFilterDone(event) {
        // console.log('onFilterDone', event.target.checked);
        this.toggleFilterDone(event.target.checked);
    }

    render() {
        return (
            <div className="filter-box">
                <div className="block">
                    <div className="title">
                        <h2>Filter</h2>
                        <FilterLogo />
                    </div>

                    <div className={'status ' + (this.state.filters.done.enabled && 'status-done')} onClick={this.toggleFilterDone.bind(this,null)}>
                        <p>Done todos</p>
                        {this.state.filters.done.enabled && <CheckLogo class="check-logo" />}
                    </div>

                    <div className="status status-done filter-date-picked">
                        <label htmlFor="filter-date">Date</label>
                        <button onClick={this.goPrevDay.bind(this)} className="prev-day"><CaretLeft /></button>
                        <input id="filter-date" type="date" value={this.state.filterDate.toLocaleDateString('swe')} onChange={this.onFilterDate.bind(this)} />
                        <button onClick={this.goNextDay.bind(this)} className="next-day"><CaretRight /></button>
                    </div>
                </div>

                <div className="order">
                    <p className="title">Sort Todos</p>

                    <p className={'status '+ (this.state.filters.sortDescLastEdit.enabled && 'status-done')} onClick={this.setSort.bind(this,'sortDescLastEdit')}>Latest Edit</p>
                    <p className={'status '+ (this.state.filters.sortAscLastEdit.enabled && 'status-done')} onClick={this.setSort.bind(this,'sortAscLastEdit')}>Oldest Edit</p>

                    <p className={'status '+ (this.state.filters.sortDescLastDue.enabled && 'status-done')} onClick={this.setSort.bind(this,'sortDescLastDue')}>Latest Due</p>
                    <p className={'status '+ (this.state.filters.sortAscLastDue.enabled && 'status-done')} onClick={this.setSort.bind(this,'sortAscLastDue')}>Oldest Due</p>

                    <p className={'status '+ (this.state.filters.sortDescLastDone.enabled && 'status-done')} onClick={this.setSort.bind(this,'sortDescLastDone')}>Latest Due</p>
                    <p className={'status '+ (this.state.filters.sortAscLastDone.enabled && 'status-done')} onClick={this.setSort.bind(this,'sortAscLastDone')}>Oldest Due</p>

                </div>
            </div>
        );
    }
}