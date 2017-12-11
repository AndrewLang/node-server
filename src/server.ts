
import * as express from "express";
import * as bodyParser from 'body-parser';
import * as Api from './api/index';

export class Server {

    public App: express.Application;

    port = process.env.port || 8000;

    constructor() {
        this.App = express();
    }

    public Start(): void {
        this.Routes();

        this.App.listen(this.port);

        console.log(`Server started on port ${this.port}`);
    }

    private Middleware(): void {
        this.App.use(bodyParser.json());
        this.App.use(bodyParser.urlencoded({ extended: false }));
    }

    private Routes(): void {

        console.log(`Initialize routes`);

        let router = new Api.ApiRouter(); express.Router();

        this.App.use('/', router.Build());

        console.log(`Routes were configured`);
    }
}
