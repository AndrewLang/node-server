
import * as express from "express";
import * as Common from './imports';

export class BlogRoute implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('api/blog/list', (req, res) => { });

        router.get('api/blog/get/:id', (req, res) => { });

        router.get('api/blog/getByName/:name', (req, res) => { });
        
        router.post('api/blog', (req, res) => { });
        router.delete('api/blog/:id', (req, res) => { });

        return router;
    }
}