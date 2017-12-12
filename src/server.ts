
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as Session from 'express-session';
import * as passport from "passport";
import { Strategy } from "passport-local";

import * as Api from './api/index';
import * as Common from './common/index';
import * as DI from './di/index';

import * as morgan from 'morgan';

export class Server {
    private apiRoot = '/api';

    public App: express.Application;

    port = process.env.port || 8001;

    constructor() {
        this.App = express();
    }

    public async Start() {
        this.Middleware();
        this.Routes();

        this.App.listen(this.port);

        console.log(`Server started on port ${this.port}`);


        // let db = new Common.DatabaseAccessor(`${__dirname}\\data\\MatrixBlog.db`);
        // let rows = await db.Execute('select * from posts order by DatePublished DESC LIMIT 10');
        // console.log(rows);

        /** Create instance  */
        
        let instance = DI.Activator.Createinstance<TestObj>(TestObj, 1, 2);
        
        console.log(instance);

        console.log( DI.Activator.Createinstance<ClassWithoutDecorators>(ClassWithoutDecorators, 'first', 'seconds'));

        let token = DI.Activator.Createinstance<DI.ServiceToken>(DI.ServiceToken, 'token description');
        console.log(token);
    }

    private Middleware(): void {
        this.App.use(morgan('dev'));

        this.App.use(bodyParser.urlencoded({ extended: false }));
        this.App.use(bodyParser.json());



        let session = Session({
            secret: 'node-server',
            resave: false,
            saveUninitialized: true
        });
        this.App.use(session);
        this.App.use(passport.initialize());
        this.App.use(passport.session());


        passport.use(new Strategy(
            {
                passReqToCallback: true
            },
            (req, username, password, done) => {
                console.log(username);
                console.log(password);

                let user: { username: string, password: string };
                if (username === 'andy' && password === 'supernova') {
                    user = { username: username, password: password };
                }

                return done(null, user);
            }));
        passport.serializeUser((user: { username: string }, done) => {
            done(null, user.username)
        });
        passport.deserializeUser((id, done) => {
            done(null, { username: id });
        });
    }

    private Routes(): void {

        console.log(`Initialize routes`);

        let router = new Api.ApiRouter();
        let postRouter = new Api.PostRouter();


        this.App.use('/', router.Build());
        this.App.use(this.apiRoot, postRouter.Build());
        this.App.use(this.apiRoot, new Api.BlogRoute().Build());
        this.App.use(this.apiRoot, new Api.UserRoute().Build());

        console.log(`Routes were configured`);
        //console.log( this.App);
    }

    getInstance<T>(ctor: DI.Type<T>, ...args: any[]): T {
        var instance = Object.create(ctor.prototype);
        ctor.apply(instance, args);
        return <T>instance;
    }

    factory<T>(t: DI.Type<T>): (...args: any[]) => T {
        return (...args: any[]) => new t(...args);
    }

    getParentCtor(ctor: Function): DI.Type<any> {
        const parentProto = Object.getPrototypeOf(ctor.prototype);
        console.log(parentProto);

        const parentCtor = parentProto ? parentProto.constructor : null;
        // Note: We always use `Object` as the null value
        // to simplify checking later on.
        return parentCtor || Object;
    }
}

export function create(ctor: Function, ...args: any[]): any {
    let obj = Object.create(ctor.prototype);
    // ctor.apply(obj, args);
    return obj;
}

class TestObj {

    constructor(public a: any, public b: any) { }

    identity(arg: any) { return arg; }
}
class ClassWithoutDecorators {
    constructor(public a: any, public b: any) { }
}