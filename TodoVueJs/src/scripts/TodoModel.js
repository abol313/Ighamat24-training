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
            this.getDB().createTable(TodoModel.table, TodoModel.fields);

        return this.getDB().useTable(TodoModel.table);
    }

    /**
     * 
     * @returns {TodoModel} connects to the db and table then returns itself instance
     */
    static connect(){
        let tableModel = new TodoModel(new StorageDB(window.localStorage, TodoModel.db, TodoModel.password));
        
        return tableModel;
    }

    /**
     * 
     * @param {object} record gets the record key values to insert on table
     * @returns {TodoModel}
     */
    static create(record){
        let tableModel = this.connect();
        tableModel.useTable()
            .insert(record);
        
        tableModel.getDB().storeStorage();
        return tableModel;
    }

    /**
     * finds the record base of the primary key and updates that 
     * @param {number} id the id of the record to be updated
     * @param {object} newRecord new field values will be replaced
     * @returns {TodoModel}
     */
    update(id, newRecord){
        let tableModel = this.connect();
        tableModel.useTable()
            .update(id, newRecord);
        
        tableModel.getDB().storeStorage();
        return tableModel;

    }

    /**
     * returns query builder of the table
     * @returns {QueryBuilder} returns the query builder to pass queries conditions and etc.
     */
    static query(){
        return this.connect()
            .useTable()
            .query();
    }

    /**
     * returns all of records of the table
     * @returns {array} returns an array of objects each one as row/record
     */
    static all(){
        return this.connect()
            .useTable()
            .all();
    }
}