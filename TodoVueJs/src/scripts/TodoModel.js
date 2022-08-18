import StorageDB from "../modules/StorageDB";
export default class TodoModel {
    storageDB;
    static table = 'todos';
    static password = '12345678';
    static fields = [
        'id',
        'title',
        'description',

        'due_at',
        'done_at',
        'created_at',
        'updated_at',
    ];
    
    /**
     * 
     * @param {StorageDB} storageDB 
     */
    constructor(storageDB){
        this.storageDB = storageDB;
    }

    getDB(){
        return this.storageDB;
    }

    useTable(){
        if(this.getDB().useTable(this.table) === undefined)
            this.getDB().createTable(this.table, this.fields);

        return this.getDB().useTable(this.table);
    }


    static connect(){
        let tableModel = new TodoModel(new StorageDB(window.localStorage, 'todo_db', this.password));
        
        return tableModel;
    }

    static create(record){
        let tableModel = this.connect();
        tableModel.getDB()
            .useTable('todos')
            .insert({

            });
        
        return tableModel;
    }

    static query(){
        return this.useTable().query();
    }

}