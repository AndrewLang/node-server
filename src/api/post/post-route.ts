
import * as express from "express";
import * as Common from './imports';

export class PostRouter implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('/post/list', (req, res) => { 
            res.json({
                data: 'post list',
                message:'',
                succeed: true
            });
        });
        router.get('/post/listByBlog/:blogId', (req, res) => { 
            res.json({
                data: req.params,
                message:'',
                succeed: true
            });
        });
        router.get('/post/listByUser/:userId', (req, res) => {
            res.json({
                data: req.params,
                message:'',
                succeed: true
            });
         });

        router.get('/post/get/:id', (req, res) => { 
            res.json({
                data: req.params,
                message:'',
                succeed: true
            });
        });
        router.get('/post/getByPath/:path', (req, res) => { 
            res.json({
                data: req.params,
                message:'',
                succeed: true
            });
        });
        router.get('/post/getBySlug/:slug', (req, res) => { 
            res.json({
                data: req.params,
                message:'',
                succeed: true
            });
        });
        
        router.post('/post/search', (req, res) => { 
            res.json({
                data: req.body,
                message:'',
                succeed: true
            });
        });        
        router.post('/post', (req, res) => { 
            console.log(req.body);
            res.json({
                data: req.body,
                message:'',
                succeed: true
            });
        });
        
        router.delete('/post/:id', (req, res) => { 
            res.json({
                data: req.params,
                message:'',
                succeed: true
            });
        });

        return router;
    }
}