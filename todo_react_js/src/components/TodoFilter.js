import React from "react";

export default class TodoFilter extends React.Component {
    constructor(props){
        super(props);

        this.state = {

            filterDate: new Date(),


            filters:{
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

                done:{
                    pipeEach: todo => todo.done_at!==null,
                    isIncluded: true,
                    enabled:false,
                },

                undone:{
                    pipeEach: todo => todo.done_at===null,
                    isIncluded: true,
                    enabled:true,
                },


                date:{
                    pipeAll: todos=> {
                        return todos.filter(todo => new Date(todo.due_at).toDateString() === this.getFilterDate().toDateString());
                    },
                    enabled:true,
                },

                sort:{
                    pipeAll: todos => todos.sort((a,b)=>this.sortLastCreate(a,b,true)),
                    enabled: true,
                },

  

                
            },



        };
    }

    componentDidMount(){
        this.filter();
    }

    filter(){
        // let callback = this.state.filterCallback
        this.props.filter(this.filterCallback.bind(this));
    }

    sortLastCreate(todoA, todoB, isDesc=true){
        let todoADate = new Date( todoA.created_at );
        let todoBDate = new Date( todoB.created_at );

        if(isDesc)
            return todoADate.getTime() > todoBDate.getTime() ? -1:1;
        else
            return todoADate.getTime() < todoBDate.getTime() ? -1:1;

    }

    toggleFilterDone(){
        this.filters.done.enabled = !this.filters.done.enabled;
        this.filter();
    }


    filterCallback(orgTodos){
        let filteredTodos = [];
        let unfilteredTodos = [...orgTodos];

        // debugger;
        for(const filter of Object.values(this.state.filters)){
            if(!filter.enabled)continue;

            if(filter.pipeEach){

                for(let i=0; i<unfilteredTodos.length ; i++){

                    let unfilteredTodo = unfilteredTodos[i];

                    let piped = filter.pipeEach(unfilteredTodo);
                    //if it is boolean handled existance of item else the returned value from piping will be passed
                    if(piped===true || piped===false){
                        if(piped===true){
                            if(filter.isIncluded)
                                filteredTodos.push(unfilteredTodo);
                            unfilteredTodos.splice(i--,1);
                        }else if(!filter.isIncluded){
                            filteredTodos.push(unfilteredTodo);
                        }
                    }else{
                        filteredTodos.push(piped);
                        unfilteredTodos.splice(i--,1);
                    }

                }

                
            }else if(filter.pipeAll){
                filteredTodos = filter.pipeAll(filteredTodos);
            }
        }


        return filteredTodos;

    }

    toggleFilterDone(isDone=null){
        this.state.filters.done.enabled = isDone===null ? !this.state.filters.done.enabled : isDone;
        this.setState({
            filters: this.state.filters
        });
        this.filter();
    }

    getFilterDate(){
        return this.state.filterDate;
    }

    goNextDay(){
        this.state.filterDate.setTime(this.state.filterDate.getTime() + 1e3 * 60 * 60 * 24);
        this.setState({
            filterDate: this.state.filterDate,
        });
        this.filter();
    }

    goPrevDay(){
        this.state.filterDate.setTime(this.state.filterDate.getTime() - 1e3 * 60 * 60 * 24);
        this.setState({
            filterDate: this.state.filterDate,
        });
        this.filter();
    }

    onFilterDate(event){
        const [year, month, day] = event.target.value.split('-');
        this.state.filterDate.setFullYear(year);
        this.state.filterDate.setMonth(month);
        this.state.filterDate.setDate(day);
        this.setState({
            filterDate: this.state.filterDate
        });
        this.filter();
    }

    onFilterDone(event){
        // console.log('onFilterDone', event.target.checked);
        this.toggleFilterDone(event.target.checked);
    }

    render(){
        return (
            <div className="filter-box">
                <div className="block">
                    <div className="title">
                        <h2>Filter</h2>
                    </div>

                    <div className={'status '+ (this.state.filters.done.enabled && 'status-done')}>
                        <label htmlFor="filter-dones">Dones</label>
                        <input id="filter-dones" type="checkbox" onChange={this.onFilterDone.bind(this)}/>
                    </div>

                    <div className="status">
                        <label htmlFor="filter-date">Date</label>
                        <button onClick={this.goPrevDay.bind(this)}>-</button>
                        <input id="filter-date" type="date" value={this.state.filterDate.toLocaleDateString('swe')} onChange={this.onFilterDate.bind(this)}/>
                        <button onClick={this.goNextDay.bind(this)}>+</button>
                    </div>
                </div>
            </div>
        );
    }
}