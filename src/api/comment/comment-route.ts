
import * as express from "express";
import * as Common from './imports';

export class CommentRoute implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('api/comment/list', (req, res) => { });

        router.get('api/comment/get/:id', (req, res) => { });

        
        router.post('api/comment', (req, res) => { });
        router.delete('api/comment/:id', (req, res) => { });

        return router;
    }
}