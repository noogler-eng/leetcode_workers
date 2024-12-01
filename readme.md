### Main server
Redis is an open-source, in-memory data structure store, 
used as a database, cache, and message broker One of the key 
features of Redis is its ability to keep all data in memory, 
which allows for high performance and low latency access to data.

1. this will send the prblem to the redis or in memory queue which is connectd to kafka
2. kafka or pub sub models sends it to workers node
3. on worker nodes they will process it and send back test result ot client node (extra services can be used)

### Worker
1. Here kafka or load balance will it probelm or task to do it
2. reduces the load of cheking the code on main server
3. this are worker nodes or server, code was written only for checking the problem