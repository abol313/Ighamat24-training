import TodoModel from './TodoModel.js';

window.TodoModel = TodoModel;

// for(let i=0; i<10; i++)
//     console.log(TodoModel.create({
//         // id:i,
//         title:'title'+i,
//         description:'description'+i,
//         due_at: makeRandomlyDate(2022),
//         done_at: makeRandomlyDate(2022),

//         created_at: makeRandomlyDate(2022),
//         updated_at: makeRandomlyDate(2022),
//     }));

function makeRandomlyDate(year=null , month=null, day=null){
    return new Date(parseInt(year || Math.random()*1000+1971), parseInt(month || Math.random()*12), parseInt(day || Math.random()*29))
}
// console.log(TodoModel.all());
// console.log(TodoModel.query());
// console.log(TodoModel.query().whereIn('id',[1,2,3,4,5,6]));
// console.log(TodoModel.create({id:5, title:'okok i0'}));

