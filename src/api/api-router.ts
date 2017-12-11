
import * as express from "express";
import * as Common from './imports';

export class ApiRouter implements Common.IRouterProvider{

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
            next();
        });
        router.get('/home', (req, res, next) => {
            res.json({
                message: 'Home page'
            });
            next();
        });

        return router;
    }

}