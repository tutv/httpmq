httpmq ![npm](https://img.shields.io/npm/v/httpmq) ![CircleCI](https://img.shields.io/circleci/build/github/tutv/httpmq) ![NPM](https://img.shields.io/npm/l/httpmq) ![npm](https://img.shields.io/npm/dm/httpmq)
-------

RabbitMQ
via [HTTP API](https://rawcdn.githack.com/rabbitmq/rabbitmq-server/v3.9.14/deps/rabbitmq_management/priv/www/api/index.html)
in Node.js

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

#### 1. Connections

```javascript
// Get list connections
const connections = await client.listConnections()

```

#### 2. Queues

```javascript
// Get list queues
const queues = await client.listQueues()

// Get sepecific queue
const queue = await client.getQueue('queueName')

// Send to queue
// Get sepecific queue
await client.sendToQueue('queueName', body, {ttl: 7200_000})
```

License
-------

MIT
