import TodoModel from './TodoModel.js';
window.TodoModel = TodoModel;

console.log(TodoModel.create({id:1, title:'go to the gym'}));
console.log(TodoModel.create({id:2, title:'some to the jam'}));
console.log(TodoModel.create({id:3, title:'hello tu the jjk'}));
console.log(TodoModel.create({id:4, title:'shallow get gym'}));
console.log(TodoModel.all());
console.log(TodoModel.query());
console.log(TodoModel.query().whereIn('id',[1,2,3,4,5,6]));
console.log(TodoModel.create({id:5, title:'okok i0'}));

