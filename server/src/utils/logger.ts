import { pino, Logger } from 'pino'
import 'dotenv/config'

const NODE_ENV = <string>process.env.NODE_ENV

const level = <string>process.env.LOG_LEVEL || 'info'
let logger: Logger

if (NODE_ENV === 'dev') {
    logger = pino({
        transport: {
            target: 'pino-pretty',
        },
        level,
        base: {
            pid: false,
        },
    })
} else {
    logger = pino({
        level,
        base: {
            pid: false,
        },
    })
}



export default logger

