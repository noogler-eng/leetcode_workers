import express from "express";
import { createClient } from 'redis';

// Redis is an open-source, in-memory data structure store, 
// used as a database, cache, and message broker One of the key 
// features of Redis is its ability to keep all data in memory, 
// which allows for high performance and low latency access to data.

const main_server = express();
const client = createClient();
main_server.use(express.json());

main_server.get('/', (req, res)=>{
    res.status(200).json('server is working fine');
})

// this will send the prblem to the redis or in memory queue which is connectd to kafka
// kafka or pub sub models sends it to workers node
// on worker nodes they will process it and send back test result ot client node (extra services can be used)
main_server.post('/submit', async(req, res)=>{
    const {problemId, code, language, testCases} = req.body;
    try{
        client.lPush("problems", JSON.stringify({problemId, code, language, testCases}));
        res.status(200).send("Submission recieved");
    }catch(error){
        console.log('error while submiting code', error);
        res.status(500).send("Failed to store submission.");
    }
})

const PORT = process.env.PORT || 3000
main_server.listen(PORT, async()=>{
    await client.connect();
    console.log(`server listening at: http://localhost:${PORT}`)
})
