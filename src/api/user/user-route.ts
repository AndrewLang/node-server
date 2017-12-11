
import * as express from "express";
import * as passport from "passport";
import * as Common from './imports';

export class UserRoute implements Common.IRouterProvider {

    authenticate: (req, res, next) => void;

    constructor() {
        this.authenticate = (req, res, next) => {

            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.json({
                        data: req.body,
                        message: 'Invalid username or password.',
                        succeed: false
                    });
                }

                next();
            })(req, res, next);
        };

    }
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
        router.post('/user/signin',
            this.authenticate,
            (req, res) => {                
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