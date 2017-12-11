
import * as express from "express";
import * as Common from './imports';

export class PostRoute implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('api/post/list', (req, res) => { });
        router.get('api/post/listByBlog/:blog', (req, res) => { });
        

        router.get('api/post/get/:id', (req, res) => { });
        router.get('api/post/getByPath/:path', (req, res) => { });
        router.get('api/post/getBySlug/:slug', (req, res) => { });
        
        router.post('api/post/search', (req, res) => { });
        
        router.post('api/post', (req, res) => { });
        router.delete('api/post/:id', (req, res) => { });

        return router;
    }
}