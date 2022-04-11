import {ConnectionOptions} from "./ConnectionOptions"
import {RequestMaker} from "./RequestMaker"
import {QueueObject} from "../interfaces/QueueObject"
import {ConnectionObject} from "../interfaces/ConnectionObject"
import {PublishOptions} from "../interfaces/PublishOptions"


export class RabbitMQHTTP {
    private readonly options: ConnectionOptions
    private readonly request: RequestMaker

    constructor(uri: string) {
        this.options = new ConnectionOptions(uri)
        this.request = new RequestMaker(this.options)
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

    /**
     *  Message will be published to the default exchange with routing key queueName
     *
     * @param queueName
     * @param body
     * @param opts
     */
    public async sendToQueue(queueName: string, body: any, opts?: PublishOptions) {
        const str = JSON.stringify(body)
        const url = `/api/exchanges/${this.options.getVhost()}/amq.default/publish`

        const {persistent, headers, ttl} = Object.assign({persistent: true}, opts)
        const delivery_mode = persistent ? "2" : "1"
        const vHeaders = Object.assign({}, headers)

        const properties: Record<string, any> = {}
        if (ttl && ttl > 0) {
            properties['expiration'] = (ttl || "").toString()
        }

        const vQueueName = this.options.getQueueNameWithPrefix(queueName)
        console.log(vQueueName)

        return this.request.makeRequest(url, {
            method: 'POST',
            json: {
                delivery_mode,
                headers: vHeaders,
                routing_key: vQueueName,
                payload: str,
                payload_encoding: "string",
                properties,
            }
        })
    }
}

