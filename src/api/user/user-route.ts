
import * as express from "express";
import * as Common from './imports';

export class UserRoute implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('api/user/list', (req, res) => { });

        router.get('api/user/:id', (req, res) => { });
        
        router.post('api/user', (req, res) => { });
        router.delete('api/user/:id', (req, res) => { });

        return router;
    }
}