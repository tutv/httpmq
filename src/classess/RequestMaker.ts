import {ConnectionOptions, MyRequestOptions} from "./ConnectionOptions"
import {MakePromiseRequest} from "./MakePromiseRequest"


export class RequestMaker {
    private readonly options: ConnectionOptions

    constructor(opts: ConnectionOptions) {
        this.options = opts
    }

    public async makeRequest(path: string, args?: MyRequestOptions) {
        const [httpOptions, data] = this.options.getHTTPOptions(path, args)
        const promisify = new MakePromiseRequest(httpOptions, data)

        return promisify.run()
    }
}
