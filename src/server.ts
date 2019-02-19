import 'dotenv/config';
import app from './app';
import validateEnv from './utils/validateEnv';
import configOptions from './config';

validateEnv();

app.listen(configOptions.port, () => {
    console.log(`App listening on the port ${configOptions.port}`);
});
