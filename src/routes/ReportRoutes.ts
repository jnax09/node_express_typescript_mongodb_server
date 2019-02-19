import * as express from 'express';
import Routing from '../interfaces/Routing';
import authMiddleware from '../middlewares/Auth';
import reportController from '../controllers/ReportController';

class ReportRoutes implements Routing {
    public router: express.Router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', authMiddleware, reportController.generateReport);
    }
}

export const reportRoutes = new ReportRoutes().router;
