import {URL} from 'url'


export class ConnectionOptions {
    private readonly uri: string

    private host: string = ''
    private port: string = ''
    private username: string = 'guest'
    private password: string = 'guest'
    private isHTTPS: boolean = false


    public vhost: string = '/'

    constructor(uri: string) {
        console.log("CREATE_URI:", uri)

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
        this.port = port
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
}

