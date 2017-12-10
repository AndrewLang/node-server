import { Server } from './server';

export class Bootstrap {

    constructor() {
        console.log('Bootstrap app...');


        let server = new Server();
        server.Start();
    }
}


// import express = require('express');
// let app = express();

// app.get('/', function (request, response) {
//     response.send('Hello World');
// });

// app.listen(3000);

export default new Bootstrap();