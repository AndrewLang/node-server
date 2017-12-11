
import * as express from "express";
import * as Common from './imports';

export class UserRoute implements Common.IRouterProvider {

    Build(options?: any): express.Router {
        let router = express.Router();
        router.get('/user/list', (req, res) => {
            res.json({
                data: req.params,
                message: '',
                succeed: true
            });
        });

        router.get('/user/:id', (req, res) => {
            res.json({
                data: req.params,
                message: '',
                succeed: true
            });
        });


        router.post('/user', (req, res) => {
            res.json({
                data: req.body,
                message: '',
                succeed: true
            });
        });
        router.post('/user/register', (req, res) => {
            res.json({
                data: req.body,
                message: '',
                succeed: true
            });
        });
        router.post('/user/signin', (req, res) => {
            res.json({
                data: req.body,
                message: '',
                succeed: true
            });
        });
        router.post('/user/signout', (req, res) => {
            res.json({
                data: req.body,
                message: '',
                succeed: true
            });
        });

        router.delete('/user/:id', (req, res) => {
            res.json({
                data: req.params,
                message: '',
                succeed: true
            });
        });

        return router;
    }
}