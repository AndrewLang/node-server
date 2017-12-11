
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as Api from './api/index';
import * as morgan from 'morgan';


export class Server {

    public App: express.Application;

    port = process.env.port || 8001;

    constructor() {
        this.App = express();
    }

    public Start(): void {
        this.Middleware();
        this.Routes();

        this.App.listen(this.port);

        console.log(`Server started on port ${this.port}`);
    }

    private Middleware(): void {
        this.App.use(morgan('dev'));

        this.App.use(bodyParser.urlencoded({ extended: false }));
        this.App.use(bodyParser.json());        
    }

    private Routes(): void {

        console.log(`Initialize routes`);

        let router = new Api.ApiRouter(); 
        let postRouter = new Api.PostRouter();

        this.App.use('/', router.Build());
        this.App.use('/api', postRouter.Build());

        console.log(`Routes were configured`);
        //console.log( this.App);
    }
}
