function insert() {
    const collectionName = 'time';
    if(db.getCollectionNames().some(col => col == collectionName)) {
        db[collectionName].drop();
    }
    db.createCollection(collectionName);
    
    const collection = db[collectionName];
    
    collection.insert( { _id: 1, name: "FullYear" } );
    collection.insert( { _id: 2, name: "1 Quarter", parentId: 1 } );
    collection.insert( { _id: 3, name: "2 Quarter", parentId: 1 } );
    collection.insert( { _id: 4, name: "3 Quarter", parentId: 1 } );
    collection.insert( { _id: 5, name: "4 Quarter", parentId: 1 } );

    collection.insert( { _id: 6, name: "Jan", parentId: 2 } );
    collection.insert( { _id: 7, name: "Feb", parentId: 2 } );
    collection.insert( { _id: 8, name: "Mar", parentId: 2 } );

    collection.insert( { _id: 9,  name: "Apr", parentId: 3 } );
    collection.insert( { _id: 10, name: "May", parentId: 3 } );
    collection.insert( { _id: 11, name: "Jun", parentId: 3 } );

    collection.insert( { _id: 12, name: "Jul", parentId: 4 } );
    collection.insert( { _id: 13, name: "Aug", parentId: 4 } );
    collection.insert( { _id: 14, name: "Sep", parentId: 4 } );

    collection.insert( { _id: 15, name: "Oct", parentId: 5 } );
    collection.insert( { _id: 16, name: "Now", parentId: 5 } );
    collection.insert( { _id: 17, name: "Dec", parentId: 5 } );
}

insert();
