
import * as express from "express";
import * as Common from './imports';

export class BlogRoute implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('/blog/list', (req, res) => {
            res.json({
                data: 'blog list',
                message: '',
                succeed: true
            });
        });

        router.get('/blog/get/:id', (req, res) => {
            res.json({
                data: req.params,
                message: '',
                succeed: true
            });
        });

        router.get('/blog/getByName/:name', (req, res) => {
            res.json({
                data: req.params,
                message: '',
                succeed: true
            });
        });

        router.post('/blog', (req, res) => {
            res.json({
                data: req.body,
                message: '',
                succeed: true
            });
        });
        router.delete('/blog/:id', (req, res) => {
            res.json({
                data: req.params,
                message: '',
                succeed: true
            });
        });

        return router;
    }
}