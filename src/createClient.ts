import {RabbitMQHTTP} from "./classess/RabbitMQHTTP"


export const createClient = (uri: string): RabbitMQHTTP => {
    return new RabbitMQHTTP(uri)
}

