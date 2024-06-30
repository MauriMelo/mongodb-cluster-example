// mongodb-configsvr-01
rs.initiate ({ 
    _id: "configserver",
    configsvr: true,
    version: 1,
    members: [
        { 
            _id: 0,
            host: "mongodb-configsvr-01:27017"
        }, 
        { 
            _id: 1,
            host: "mongodb-configsvr-02:27017"
        }, 
        { 
            _id: 2,
            host: "mongodb-configsvr-03:27017"
        }
    ]
})

// mongodb-shard-node-01
rs.initiate ({ 
    _id: "shard01",
    version: 1,
    members: [
        { 
            _id: 0,
            host: "mongodb-shard-node-01:27017"
        },
        { 
            _id: 1,
            host: "mongodb-shard-node-02:27017"
        },
        { 
            _id: 3,
            host: "mongodb-shard-node-03:27017"
        }
    ]
})

// mongodb-shard-node-04
rs.initiate ({ 
    _id: "shard02",
    version: 1,
    members: [
        { 
            _id: 0,
            host: "mongodb-shard-node-04:27017"
        },
        { 
            _id: 1,
            host: "mongodb-shard-node-05:27017"
        },
        { 
            _id: 3,
            host: "mongodb-shard-node-06:27017"
        }
    ]
})

// mongodb-shard-node-07
rs.initiate ({ 
    _id: "shard03",
    version: 1,
    members: [
        { 
            _id: 0,
            host: "mongodb-shard-node-07:27017"
        },
        { 
            _id: 1,
            host: "mongodb-shard-node-08:27017"
        },
        { 
            _id: 3,
            host: "mongodb-shard-node-09:27017"
        }
    ]
})

//mongodb-router-node-01
sh.addShard("shard01/mongodb-shard-node-01:27017")
sh.addShard("shard01/mongodb-shard-node-02:27017")
sh.addShard("shard01/mongodb-shard-node-03:27017")

sh.addShard("shard02/mongodb-shard-node-04:27017")
sh.addShard("shard02/mongodb-shard-node-05:27017")
sh.addShard("shard02/mongodb-shard-node-06:27017")

sh.addShard("shard03/mongodb-shard-node-07:27017")
sh.addShard("shard03/mongodb-shard-node-08:27017")
sh.addShard("shard03/mongodb-shard-node-09:27017")

sh.enableSharding("DBExemploShard")

"use DBExemploShard"

sh.shardCollection("DBExemploShard.exampleCollection", { "_id": "hashed" })

db.exampleCollection.insert({ "nome": "Nome 1", "idade": 30 })
db.exampleCollection.insert({ "nome": "Nome 2", "idade": 31 })
db.exampleCollection.insert({ "nome": "Nome 3", "idade": 32 })


