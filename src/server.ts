
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

        this.TestReflect();
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
        console.log('do noting');
    }
}
interface IFackService {
    Do(): void;
}
@DI.Injectable()
class FackService implements IFackService {
    Do(): void {
        console.log('Calling Fack Service');
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
            this.loggingService.Debug(error);
        } else {
            console.log('Logging service not found.')
        }
        if (this.mockService) {
            this.mockService.Do();
        }
        if (this.fackService) {
            this.fackService.Do();
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

function logParamTypes(target: any, key: string) {
    var types = Reflect.getMetadata("design:paramtypes", target, key);
    var s = types.map(a => a.name).join();
    console.log(`Method ${key} param types: ${s}`);
}


class Calculator {


    constructor(
        @DI.Service('service toke param') des?: string
    ) {
        let services = new DI.ServicecContainer();
        let token = { Token: 'ILoggingService' };
        let errortoken = { Token: 'IExceptionLoggingService' };

        services.Register(DI.ServiceDescriptor.Singleton(token).UseType(LoggingService));
        services.Register(DI.ServiceDescriptor.Singleton(errortoken).UseType(ExceptionLoggingService));
        //services.Register(DI.ServiceDescriptor.Singleton())

        // let loggingSvc = services.GetService<ILoggingService>(token);


        // Debug('Get constructor name', DI.Activator.GetFunctionName(LoggingService));
        // Debug('Get constructor metadata', DI.Activator.GetConstructorMetadata(LoggingService))

        Debug('Get constructor name', DI.Activator.GetFunctionName(ExceptionLoggingService));
        Debug('Keys', Reflect.getMetadataKeys(ExceptionLoggingService));
        let metadata = DI.Activator.GetConstructorMetadata(ExceptionLoggingService);
        if (metadata.CompilerData) {
            Debug('Non-inject', metadata.CompilerData.toString());
            console.log(DI.Activator.GetFunctionName(metadata.CompilerData));
        }
        for (let item in metadata.UserData) {
            let data = metadata.UserData[item][0];

            console.log(`Key: ${data.Key}, Value: `);
            console.log(data.Value);

            // let svc = services.GetService(data.Value);
            // Debug('Service', svc);
        }
        // Debug('Get constructor compiler metadata of exception service', metadata.CompilerData.toString());
        // DebugMetaMap('Get constructor user  metadata', metadata.UserData);

        let data = DI.Reflector.GetMetadata(DI.KnownKeys.ParamTypes, ExceptionLoggingService);
        Debug('Get metadata', data)
        for (let item in data) {
            console.log(item);
            let func = data[item];
            let name = DI.Activator.GetFunctionName(func);
            console.log(name);

            if (name && name !== 'Object') {
                let instance = DI.Activator.Createinstance(func);
                console.log(`Instance for ${name}`);
                console.log(instance);
                (instance as any).Do();
            }
        }

        console.log('');
    }

    @logParamTypes
    add(x: number, y: number) {
        return x + y;
    }
}

new Calculator('test', ).add(1, 3);