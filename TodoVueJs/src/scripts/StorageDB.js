export default class StorageDB {
    name;
    tables;
    storage;
    storageKey;
    password;

    /**
     * 
     * @param {Storage} storage 
     * @param {string} dBName 
     * @param {password} password
     * @param {string} storageKey
     */
    constructor(storage, dBName, password='', storageKey = 'local_storage_db'){
        this.name = dBName;
        this.storage = storage;
        this.storageKey = storageKey + '_' +this.dBName;
        this.tables = {};
        this.prepareStorage();
    }

    getSecretStorageKey(){
        return this.storageKey + '_' + this.makeHashed(this.storageKey + this.password);
    }

    /**
     * 
     * @param {string} ciphertext Pass the cipher text to validate the db key that stored on its storage
     */
    checkSecretStorageKey(ciphertext){
        return ciphertext === this.getSecretStorageKey();
    }
    
    /**
     * 
     * @param {string} plaintext Give your plain text to hash
     * @returns {string}
     */
    makeHashed(plaintext){
        let ciphertext = ''
        for(let charIndex = 0; charIndex < plaintext.length; charIndex++){
            let charCode = plaintext.charCodeAt(charIndex);
            let secretCharCode = (plaintext.length * charCode * 100 / 13) ** 3 ** 1/2;
            secretCharCode %= 1e15;
            ciphertext += String.fromCharCode(secretCharCode)
        }

        return ciphertext;
    }

    prepareStorage(){
        let rawJsonData = this.storage.getItem(this.getSecretStorageKey());
        if(rawJsonData === null){
            this.storage.setItem(this.getSecretStorageKey(), JSON.stringify(this));
        }else{
            let jsonData = JSON.parse(rawJsonData);
            for(let jsonTableKey of Object.keys(jsonData.tables)){
                let jsonTable = jsonData.tables[jsonTableKey];
                let table = new StorageTable(jsonTable.name, jsonTable.fields, jsonTable.data);

                this.tables[jsonTableKey]=table;
            }
        }

    }

    storeStorage(){
        this.storage.setItem(this.getSecretStorageKey(), JSON.stringify(this));
        
        return this;
    }

    createTable(tableName, tableFields){
        if(tableName in this.tables)
            return false;
    
        return this.tables[tableName] = new StorageTable(tableName, tableFields);
    }

    useTable(tableName){
        return this.tables[tableName];
    }

}

export class StorageTable {
    name;
    fields;
    data;

    /**
     * 
     * @param {string} name 
     * @param {array} fieldNames 
     * @param {array} data
     */
    constructor(name, fieldNames, data=[]){
        this.name = name;
        this.fields = fieldNames;
        this.data = data;
    }

    insert(record){
        let filteredRecord = this.validateRecord(record);
        if(!filteredRecord)
            return false;
    
        this.data.push(filteredRecord);

        return this;
    }

    validateRecord(record){
        if(typeof record != "object")
            return false;
        
        let filteredRecord = {};

        for(let field of this.fields)
            if(! (field in record))
                return false;
            else
                filteredRecord[field] = record[field];

        return filteredRecord;
    }

    query(){
        return new QueryBuilder(this);
    }

    all(){
        return this.data;
    }
}

export class QueryBuilder {
    table;
    queryData;

    /**
     * 
     * @param {StorageTable} table - The table
     */
    constructor(table){
        this.table = table;
        this.queryData = this.table.all();
    }

    requery(){
        this.queryData = this.table.all();

        return this;
    }

    get(){
        return this.queryData;
    }


    where(column, value){
        this.queryData = this.queryData.filter( (record) => {
            return record[column] == value;
        });

        return this;
    }

    whereNot(column, value){
        this.queryData = this.queryData.filter( (record) => {
            return record[column] != value;
        });

        return this;
    }

    whereIn(column, values){
        this.queryData = this.queryData.filter( (record) => {
            return values.includes(record[column]);
        });

        return this;
    }

    whereNotIn(column, values){
        this.queryData = this.queryData.filter( (record) => {
            return !values.includes(record[column]);
        });

        return this;
    }
}
export class StorageModel {

}