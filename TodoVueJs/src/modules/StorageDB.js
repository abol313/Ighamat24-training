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
                let table = new StorageTable(jsonTable.name, jsonTable.fields, jsonTable.data, jsonTable.key);

                this.tables[jsonTableKey]=table;
            }
        }

    }

    /**
     * this method stores db information on the storage 
     * @returns {StorageDB}
     */
    storeStorage(){
        const {storage, storageKey, password, name, ...obj} = this;
        this.storage.setItem(this.getSecretStorageKey(), JSON.stringify(obj));
        
        return this;
    }

    /**
     * 
     * @param {string} tableName the name of table you want to create
     * @param {array} tableFields the names of fields as an array of strings
     * @returns {StorageTable|boolean} returns the found table or false if not found
     */
    createTable(tableName, tableFields){
        if(tableName in this.tables)
            return false;
    
        return this.tables[tableName] = new StorageTable(tableName, tableFields);
    }

    /**
     * 
     * @param {string} tableName pass your table name
     * @returns {StorageTable}
     */
    useTable(tableName){
        return this.tables[tableName];
    }

}

export class StorageTable {
    key;
    keyName;
    name;
    fields;
    data;

    /**
     * Make your own table
     * @param {string} name 
     * @param {array} fieldNames 
     * @param {array} data
     * @param {number} key the primary key  of last created row (auto increment)
     */
    constructor(name, fieldNames, data=[], key=0){
        this.name = name;
        this.fields = fieldNames;
        this.data = data;
        this.key = key;
        this.keyName = 'id';

    }

    /**
     * 
     * @param {object} record gets object of keys as fields of table and relevant values
     * @returns {StorageTable} returns this
     */
    insert(record){
        let filteredRecord = this.validateRecord(record);
        if(!filteredRecord)
            return false;
        this.key = filteredRecord[this.keyName];
        this.data.push(filteredRecord);

        return this;
    }

    /**
     * finds the record base of the primary key and updates that 
     * @param {number} id the id of the record to be updated
     * @param {object} newRecord new field values will be replaced
     * @returns 
     */
    update(id, newRecord){
        let nowRecord = this.data.find(record=>record[this.keyName]==id);
        if(!nowRecord)
            return false;
        
        for(let field of this.fields)
            if(newRecord[field]!==undefined)
                nowRecord[field] = newRecord[field]
    }

    /**
     * validates records
     * @param {object} record gets object of keys as fields of table and relevant values
     * @returns {object} returns a sanitized object that matches all fields of table if all 
     * did not match then returns false
     */
    validateRecord(record){
        if(typeof record != "object")
            return false;
        
        let filteredRecord = {};

        for(let field of this.fields)
            if(! (field in record) && field!=this.keyName)
                return false;
            else
                filteredRecord[field] = record[field];

        if(filteredRecord[this.keyName]===undefined)
            filteredRecord[this.keyName] = this.key+1;
        
        if(filteredRecord[this.keyName] <= this.key)
            return false;

        return filteredRecord;
    }

    /**
     * returns queryBuilder
     * @returns {QueryBuilder}
     */
    query(){
        return new QueryBuilder(this);
    }

    /**
     * returns array of records/rows as objects
     * @returns {array}
     */
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

    /**
     * refreshes data from table 
     * @returns {QueryBuilder}
     */
    requery(){
        this.queryData = this.table.all();

        return this;
    }

    /**
     * returns built query data as an array of objects(rows/records)
     * @returns {array}
     */
    get(){
        return this.queryData;
    }


    /**
     * queries rows those have column equal to value
     * @param {string} column the column name of table
     * @param {any} value the value to be checked
     * @returns {QueryBuilder}
     */
    where(column, value){
        this.queryData = this.queryData.filter( (record) => {
            return record[column] == value;
        });

        return this;
    }

    /**
     * queries rows those have column un-equal to value
     * @param {string} column the column name of table
     * @param {any} value the value to be checked
     * @returns {QueryBuilder}
     */
    whereNot(column, value){
        this.queryData = this.queryData.filter( (record) => {
            return record[column] != value;
        });

        return this;
    }

    /**
     * queries rows those have column and its value is equal to at least one of the values
     * @param {string} column the column name of table
     * @param {array} values the values to check
     * @returns {QueryBuilder}
     */
    whereIn(column, values){
        this.queryData = this.queryData.filter( (record) => {
            return values.includes(record[column]);
        });

        return this;
    }

    /**
     * queries rows those have column and its value is equal to no one of the values
     * @param {string} column the column name of table
     * @param {array} values the values to check
     * @returns {QueryBuilder}
     */
    whereNotIn(column, values){
        this.queryData = this.queryData.filter( (record) => {
            return !values.includes(record[column]);
        });

        return this;
    }
}
export class StorageModel {

}