import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

import logger from './utils/winston';
import { morganOption } from './utils/morgan';

import configOptions from './config';

import errorMiddleware from './middlewares/Error';
import { userRoutes } from './routes/UserRoutes';
import { postRoutes } from './routes/PostRoutes';
import { authRoutes } from './routes/AuthRoutes';
import { reportRoutes } from './routes/ReportRoutes';

class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cors());
        // Make the contents of the cookies accessible through  request.cookies
        this.app.use(cookieParser());
        // morgan: logging HTTP request details
        // combine Winston with Morgan to consolidate HTTP request data logs with other information.
        this.app.use(morgan('combined', morganOption));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initializeRoutes() {
        this.app.use('/users', userRoutes);
        this.app.use('/posts', postRoutes);
        this.app.use('/auth', authRoutes);
        this.app.use('/report', reportRoutes);
    }

    private connectToTheDatabase() {
        mongoose.connect(
            configOptions.dbUrl,
            {
                useNewUrlParser: true,
            },
            () => console.log(`Connected to the database!!!`),
        );
    }
}

export default new App().app;
