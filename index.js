const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()



app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.2ltpf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {
        await client.connect();
        const productCollection = client.db('ema-jhon-db').collection('products');

        // get All 
        app.get('/products', async(req, res) => {
            const query = {};
            const cursor = productCollection.find(query);

            const allProducts = await cursor.toArray();
            res.send(allProducts)
        })

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Ready..')

})



app.listen(port, () => {
    console.log('listening...')
})