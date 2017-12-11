
import * as express from "express";


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

    private Routes(): void {

        console.log(`Initialize routes`);

        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        router.get('/home', (req, res, next) => {
            res.json({
                message: 'Home page'
            });
        });

        router.get('/api', (req, res, next) => {
            res.json({
                message: 'Api root'
            });
        });

        this.App.use('/', router);

        console.log(`Routes were configured`);
    }
}
