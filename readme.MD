1. inicializar container com o comando:<br>
```docker compose --build```

2. configurar servidor de configuração:<br>
```
docker exec -it mongodb-configsvr-01 mongosh

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


```
3. configurar shard 01 primário:
```
docker exec -it mongodb-shard-node-01 mongosh
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

```
4. configurar shard 02 primário:
```
docker exec -it mongodb-shard-node-04 mongosh
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
```

5. configurar shard 03 primário
```
docker exec -it mongodb-shard-node-04 
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
```

5. configurar router:
```
docker exec -it mongodb-router-node-01 mongosh

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

```
