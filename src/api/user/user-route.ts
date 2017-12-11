
import * as express from "express";
import * as passport from "passport";
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
        router.post('/user/signin',          
            (req, res, next) => {
                
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
                })(req, res, next);
            },
            (req, res, next) => {
                console.log(req.user);
                res.json({
                    data: req.body,
                    message: '',
                    succeed: true
                });
                next();
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