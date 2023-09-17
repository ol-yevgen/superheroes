import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "./config.env") });

interface ENV {
    PORT: number | undefined;
    MONGO_URI: string | undefined;
    JWT_SECRET: string | undefined;
    BASE_URL: string | undefined;
}

interface Config {
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string
}

const getConfig = (): ENV => {
    return {
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        BASE_URL: process.env.BASE_URL
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
