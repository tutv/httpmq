import {ConnectionOptions} from "./ConnectionOptions"
import {RequestMaker} from "./RequestMaker"
import {BaseResponse} from "./BaseResponse"

export class RabbitMQHTTP {
    private readonly options: ConnectionOptions
    private readonly request: RequestMaker

    constructor(uri: string) {
        this.options = new ConnectionOptions(uri)
        this.request = new RequestMaker()
    }

    public async listQueues(): Promise<BaseResponse> {
        return this.request.makeRequest('queues')
    }
}

