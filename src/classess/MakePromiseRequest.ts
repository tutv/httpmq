import {IncomingMessage, RequestOptions} from "http"

const http = require('http')
const https = require('https')


export class MakePromiseRequest {
    private readonly opts: RequestOptions
    private readonly json?: string

    constructor(opts: RequestOptions, json?: string) {
        this.opts = opts
        if (json) this.json = json
    }

    public async run() {
        const httpModule = this.opts.protocol === 'https:' ? https : http

        return new Promise<any>((resolve, reject) => {
            const req = httpModule.request(this.opts, (res: IncomingMessage) => {
                let responseData = ''
                const _parseResponse = () => {
                    try {
                        return JSON.parse(responseData)
                    } catch (error) {
                        console.error("PARSE_RESPONSE_ERROR", error)

                        throw error
                    }
                }

                res.on('data', (chunk: string) => {
                    responseData += chunk
                })

                res.on('end', function () {
                    const jsonRes = _parseResponse()

                    const {statusCode} = res
                    if (statusCode && statusCode >= 400) {
                        const {error, reason} = Object.assign({}, jsonRes)
                        const message = reason || error

                        const err = new Error(message)
                        return reject(err)
                    }

                    return resolve(jsonRes)
                })
            })

            req.on('error', (error: Error) => {
                console.error("REQUEST_ERROR", error)

                reject(error)
            })

            if (this.json) {
                req.write(this.json)
            }

            req.end()
        })
    }
}

