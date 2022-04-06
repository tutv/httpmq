export interface QueueObject {
    name: string,
    messages: number,
    messages_ready: number,
    messages_unacknowledged: number,
    consumers: number
}

