// imports
const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
var cors = require('cors')
var bodyParser = require('body-parser')


//using imports creating objects
const port = 3000
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
client.connect();

// midlewares
app.use(bodyParser.json())
app.use(cors())

app.get('/', async(req, res) => {
    const db = client.db('PassWordManager');
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray()
    res.json(findResult)
})

app.post('/', async(req,res)=>{
    const db = client.db('PassWordManager');
    const collection = db.collection('passwords')
    collection.insertOne(req.body)
    console.log(req.body)
    res.send(true)
})
app.delete('/', async(req,res)=>{
    item = req.body
    const db = client.db('PassWordManager');
    const collection = db.collection('passwords')
    console.log(req.body)
    await collection.deleteOne({id : item.id})
    res.send(true)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})