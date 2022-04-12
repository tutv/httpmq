require('dotenv').config({
    path: require('path').join(__dirname, '.env')
})

const {createClient} = require('../dist')

const uri = process.env.URI || ''
const client = createClient(uri)

setImmediate(async () => {
    try {
        const body = {"_id": "ddddd", "syncAll": true}
        const result = await client.getQueue('sync-products.requeue')
        console.log("RESULTS:", result)
    } catch (error) {
        console.log("ERROR:", error)
    }
})
