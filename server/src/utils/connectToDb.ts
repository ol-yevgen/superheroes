import * as mongoose from 'mongoose'
import logger from '../utils/logger.js';
// import config from './validateEnv.js'

async function connectToBd() {
    try {
        // await mongoose.connect(config.MONGO_URI), {
        await mongoose.connect(<string>process.env.MONGO_URI), {
            useNewURLParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        logger.info('Connected to mongoDB')
    } catch (error) {
        if (error instanceof Error) {
            logger.error(`Server error: ${error.message}`);
        }
        else {
            console.error(`An unknown error occurred:${error}`);
        }
        process.exit(1)
    }
}

export default connectToBd