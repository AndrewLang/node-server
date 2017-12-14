
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


    }

    private TestReflect(): void {

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
@DI.Injectable()
class LoggingService implements ILoggingService {
    Debug(message: string): void {
        console.log(message);
    }
}

interface IMockService {
    Do(): void;
}

@DI.Injectable()
class MockService implements IMockService {
    Do(): void {
        console.log('Mock service do');
    }
}
interface IFackService {
    Do(): void;
}
@DI.Injectable()
class FackService implements IFackService {
    constructor( @DI.Inject({ Token: 'ITalkService' }) private talkService: ITalkService) {

    }
    Do(): void {
        console.log('Calling Fack Service');

        if (this.talkService) {
            this.talkService.Do();
        } else {
            console.log('Talk service not found');
        }
    }
}
interface ITalkService {
    Do(): void;
}
@DI.Injectable()
class TalkService implements ITalkService {
    Do(): void {
        console.log(`Talking service...`);
    }
}
interface IExceptionHandlingService {
    Handle(error: any): void;
}
@DI.Injectable()
class ExceptionLoggingService implements IExceptionHandlingService {

    constructor(private mockService: MockService,
        @DI.Inject({ Token: 'ILoggingService' }) private loggingService: ILoggingService,
        private fackService: FackService
    ) {

    }

    Handle(error: any): void {
        if (this.loggingService) {
            console.log('logging service found')
            this.loggingService.Debug(error);
        } else {
            console.log('Logging service not found.')
        }
        if (this.mockService) {
            this.mockService.Do();
        } else {
            console.log('Mock service not found.');
        }
        if (this.fackService) {
            this.fackService.Do();
        } else {
            console.log('Fack service not found.');
        }

    }
}

export const Debug = (name: string, data?: any) => {
    console.log('');
    console.log(name);
    console.log(data);
    console.log('');
};

export const DebugMetaMap = (name: string, data?: DI.MetadataMap) => {

    if (data) {
        console.log('');
        console.log(name);
        for (let item in data) {
            console.log(item);
            console.log(data[item]);
        }
        // console.log(data);
        console.log('');
    }

};


class Calculator {


    constructor(
        @DI.Service('service toke param') des?: string
    ) {
        let services = new DI.ServicecContainer();
        let token = { Token: 'ILoggingService' };
        let errortoken = { Token: 'IExceptionLoggingService' };
        let talkToken = { Token: 'ITalkService' };

        services.Register(DI.ServiceDescriptor.Singleton(token).UseType(LoggingService));
        services.Register(DI.ServiceDescriptor.Singleton(errortoken).UseType(ExceptionLoggingService));
        services.Register(DI.ServiceDescriptor.Singleton(talkToken).UseType(TalkService));

        // let svc = services.GetService<ILoggingService>(token);
        // console.log('Service instance');
        // console.log(svc);

        // console.log('');

        let exceptionSvc = services.GetService<IExceptionHandlingService>(errortoken);
        console.log('Exception Service instance');
        console.log(exceptionSvc);
        console.log('');

        exceptionSvc.Handle('False error');
        console.log();

    }


    add(x: number, y: number) {
        return x + y;
    }
}

new Calculator('test', ).add(1, 3);