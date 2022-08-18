import StorageDB,{StorageTable,QueryBuilder} from "../modules/StorageDB";
export default class TodoModel {
    storageDB;
    static db = 'todo_db';

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

    /**
     * 
     * @returns {StorageDB} returns related database
     */
    getDB(){
        return this.storageDB;
    }

    /**
     * 
     * @returns {StorageTable} returns related table
     */
    useTable(){
        if(this.getDB().useTable(this.table) === undefined)
            this.getDB().createTable(this.table, this.fields);

        return this.getDB().useTable(this.table);
    }

    /**
     * 
     * @returns {TodoModel} connects to the db and table then returns itself instance
     */
    static connect(){
        let tableModel = new TodoModel(new StorageDB(window.localStorage, this.db, this.password));
        
        return tableModel;
    }

    /**
     * 
     * @param {object} record gets the record key values to insert on table
     * @returns {TodoModel}
     */
    static create(record){
        let tableModel = this.connect();
        tableModel.getDB()
            .useTable('todos')
            .insert({

            });
        
        return tableModel;
    }

    /**
     * 
     * @returns {QueryBuilder} returns the query builder to pass queries conditions and etc.
     */
    static query(){
        return this.useTable().query();
    }

}