import {URL} from 'url'
import {RequestOptions} from "http"


export interface MyRequestOptions {
    method?: string,
    json?: Record<any, any>,
}


export class ConnectionOptions {
    private readonly uri: string

    private host: string = ''
    private port: string = '80'
    private protocol: string = 'http:'
    private username: string = 'guest'
    private password: string = 'guest'
    private isHTTPS: boolean = false


    public vhost: string = '/'

    constructor(uri: string) {
        if (!uri) {
            throw new Error('URI is required.')
        }

        this.uri = uri
        this._setup()
    }

    private _setup() {
        const url = new URL(this.uri)

        const {host, port, username, password, protocol, pathname} = url
        this.host = host
        this.protocol = protocol
        this.port = port || (this.protocol === 'https:' ? '443' : '80')

        if (username) {
            this.username = username
        }

        if (this.password) {
            this.password = password
        }

        if (protocol === 'https:') {
            this.isHTTPS = true
        }

        if (pathname !== '/') {
            this.vhost = pathname.replace(/\//gi, '')
        }
    }

    public getVhost(): string {
        if (this.vhost === '/') return '%2F'

        return this.vhost
    }

    public getHTTPOptions(path: string, args?: MyRequestOptions): [RequestOptions, string] {
        const {method, json} = Object.assign({}, args)
        const vMethod = (method || 'GET').toString().toUpperCase()
        const auth = 'Basic ' + Buffer.from(this.username + ':' + this.password).toString('base64')

        const headers: Record<string, any> = {
            'Content-Type': 'application/json',
            'Authorization': auth
        }

        let data = ''

        if (json && Object.keys(json).length) {
            data = JSON.stringify(json)
            headers['Content-Length'] = Buffer.byteLength(data)
        }

        const opts = {
            host: this.host,
            port: this.port,
            protocol: this.protocol,
            path,
            method: vMethod,
            headers,
        }

        return [opts, data]
    }
}

