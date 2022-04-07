httpmq ![npm](https://img.shields.io/npm/v/httpmq) ![CircleCI](https://img.shields.io/circleci/build/github/tutv/httpmq) ![NPM](https://img.shields.io/npm/l/httpmq) ![npm](https://img.shields.io/npm/dm/httpmq)
-------

RabbitMQ via HTTP in Node.js

Install
-------

```bash
npm install httpmq --save
# yarn add httpmq
```


### Create a client
```javascript
const {createClient} = require('httpmq')

const uri = 'http://localhost:15672/vhost'
const client = createClient(uri)
```


### Functions

#### 1. Queues
```javascript
// Get list queues
const queues = await client.listQueues()

// Get sepecific queue
const queue = await client.getQueue('queueName')
```

License
-------

MIT
