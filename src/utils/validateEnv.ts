import { cleanEnv, str, port } from 'envalid';

const options = {};

function validateEnv() {
    cleanEnv(
        process.env,
        {
            MONGO_URI: str(),
            PORT: port(),
            JWT_SECRET: str(),
        },
        options,
    );
}

export default validateEnv;
