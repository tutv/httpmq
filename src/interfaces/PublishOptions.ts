export interface PublishOptions {
    persistent?: boolean
    ttl?: number//milliseconds
    headers?: Record<string, any>
}

