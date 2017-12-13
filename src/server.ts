
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

        // this.TestActivator();

        // this.TestDI();
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

    private TestActivator(): void {
        /** Create instance  */

        let instance = DI.Activator.Createinstance<TestObj>(TestObj, 1, 2);

        console.log(instance);

        console.log(DI.Activator.Createinstance<ClassWithoutDecorators>(ClassWithoutDecorators, 'first', 'seconds'));

        // let token = DI.Activator.Createinstance<DI.ServiceToken>(DI.ServiceToken, 'token description');
        // console.log(token);
    }

    private TestDI(): void {

        console.log('');
        console.log('Start test DI... ');
        let type = ExceptionLoggingService;
        for (var item in type) {
            console.log(item);
        }
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;

        var fnStr = type.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

        console.log(fnStr);
        console.log(result);

        // console.log( type.toString());
        console.log('Type of ...');
        console.log(type);
        console.log(type.prototype);
        // console.log(type.arguments);
        console.log(type.name);
        console.log(type.length);
        // console.log(type.caller);
        console.log((<any>type).parameters);

        // let proto = Object.getPrototypeOf(type);
        // console.log(proto.constructor);
        // let temp = proto();
        // console.log(temp);

        // let ctor = DI.Activator.GetParentCtor(type);
        // console.log(ctor.prototype);


        // let services = new DI.ServicecContainer();
        // let token = { Token: 'LoggingService' };
        // let errortoken = { Token: 'ExceptionLoggingService' };

        // services.Register(DI.ServiceDescriptor.Singleton(token).UseType(LoggingService));
        // services.Register(DI.ServiceDescriptor.Singleton(errortoken).UseType(ExceptionLoggingService));

        // // services.Register(DI.ServiceDescriptor.Singleton(errortoken)
        // //     .UseFactory(serviceProvider => {
        // //         let loggingSvc = serviceProvider.GetService(token);

        // //         return new ExceptionLoggingService(loggingSvc);
        // //     }));

        // console.log(services);

        // let service = services.TryResolve<ILoggingService>(token);
        // console.log(service);
        // if (service) {
        //     service.Debug('Got logging service');
        // }

        // let errorSvc = services.TryResolve<IExceptionHandlingService>(errortoken);
        // console.log(errorSvc);
        // if (errorSvc) {
        //     errorSvc.Handle('fake exception');
        // }


    }
}

class TestObj {

    constructor(public a: any, public b: any) { }

    identity(arg: any) { return arg; }
}
class ClassWithoutDecorators {
    constructor(public a: any, public b: any) { }
}

interface ILoggingService {
    Debug(message: string): void;
}
class LoggingService implements ILoggingService {
    Debug(message: string): void {
        console.log(message);
    }
}

interface IExceptionHandlingService {
    Handle(error: any): void;
}
class ExceptionLoggingService implements IExceptionHandlingService {

    constructor( @DI.Service('LoggingService') private loggingService: ILoggingService) {

    }

    Handle(error: any): void {
        if (this.loggingService) {
            this.loggingService.Debug(error);
        } else {
            console.log('Logging service not found.')
        }
    }
}


const log = (target: Object, key: string | symbol, descriptor: TypedPropertyDescriptor<Function>) => {
    console.log('parameters: ');
    console.log(target);
    console.log(key);
    console.log(descriptor);

    return {
        value: function (...args: any[]) {
            console.log("Arguments: ", args.join(", "));
            const result = descriptor.value.apply(target, args);
            console.log("Result: ", result);
            return result;
        }
    }
}
const LOGGED_PARAM_KEY = "logged_param";
const loggedParam = (target: Object, key: string | symbol, index: number) => {

    console.log('constructor ');
    console.log(target);
    console.log(key);
    console.log(index);

    let metaForLoggedParam = target[LOGGED_PARAM_KEY];
    if (!metaForLoggedParam) {
        metaForLoggedParam = {};
        target[LOGGED_PARAM_KEY] = metaForLoggedParam;
    }
    const loggedParams: number[] = metaForLoggedParam[key] || [];
    loggedParams.push(index);
    target[LOGGED_PARAM_KEY] = loggedParams;

    console.log(target);
}

class Calculator {

    constructor( @loggedParam name: string) {

    }
    @log
    add(x: number, y: number) {
        return x + y;
    }
}

new Calculator('test').add(1, 3);