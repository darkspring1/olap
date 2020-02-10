function insert() {
    const collectionName = 'region';
    if(db.getCollectionNames().some(col => col == collectionName)) {
        db[collectionName].drop();
    }
    db.createCollection(collectionName);
    
    const collection = db[collectionName];
    
    collection.insert( { _id: 1, name: "All" } );
    collection.insert( { _id: 2, name: "Russia",    parentId: 1 } );
    collection.insert( { _id: 3, name: "USA",       parentId: 1 } );
    collection.insert( { _id: 4, name: "Europe",    parentId: 1 } );

    collection.insert( { _id: 6, name: "Moscow",        parentId: 2 } );
    collection.insert( { _id: 7, name: "Perm",          parentId: 2 } );
    collection.insert( { _id: 8, name: "Novosibirsk",   parentId: 2 } );

    collection.insert( { _id: 9,  name: "New York",     parentId: 3 } );
    collection.insert( { _id: 10, name: "Los Angeles",  parentId: 3 } );
    collection.insert( { _id: 11, name: "Jacksonville", parentId: 3 } );

    collection.insert( { _id: 12, name: "London",   parentId: 4 } );
    collection.insert( { _id: 13, name: "Paris",    parentId: 4 } );
    collection.insert( { _id: 14, name: "Lisbon",   parentId: 4 } );
}

insert();
