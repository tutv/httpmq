require('dotenv').config({
    path: require('path').join(__dirname, '.env')
})

const {createClient} = require('../dist')

const uri = process.env.URI || ''
const client = createClient(uri)

setImmediate(async () => {
    try {
        const body = {"_id": "60db3d06d0041d19ce870c95", "syncAll": true}
        const result = await client.sendToQueue('coney:que.sync-products.requeue', body)
        console.log("RESULTS:", result)
    } catch (error) {
        console.log("ERROR:", error)
    }
})
