require('dotenv').config({
    path: require('path').join(__dirname, '.env')
})

const {createClient} = require('../dist')

const uri = process.env.URI || ''
const client = createClient(uri)

setImmediate(async () => {
    try {
        const result = await client.listQueues()
        console.log("RESULTS:", result)
    }catch (error) {

    }
})
