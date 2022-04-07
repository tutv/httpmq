import {ConnectionOptions} from "./ConnectionOptions"
import {RequestMaker} from "./RequestMaker"
import {QueueObject} from "../interfaces/QueueObject"
import {ConnectionObject} from "../interfaces/ConnectionObject"


export class RabbitMQHTTP {
    private readonly options: ConnectionOptions
    private readonly request: RequestMaker

    constructor(uri: string) {
        this.options = new ConnectionOptions(uri)
        this.request = new RequestMaker(this.options)
    }

    public async listQueues(): Promise<QueueObject []> {
        const vhost = this.options.getVhost()
        const url = `/api/queues/${vhost}`

        return this.request.makeRequest(url, {
            method: 'GET'
        })
    }

    public async getQueue(queueName: string): Promise<QueueObject> {
        const vhost = this.options.getVhost()
        const url = `/api/queues/${vhost}/${queueName}`

        return this.request.makeRequest(url, {
            method: 'GET'
        })
    }

    public async listConnections(): Promise<ConnectionObject []> {
        const url = `/api/connections`

        return this.request.makeRequest(url, {
            method: 'GET'
        })
    }

    public async listAllVhosts() {
        const url = `/api/vhosts`

        return this.request.makeRequest(url, {
            method: 'GET'
        })
    }
}

