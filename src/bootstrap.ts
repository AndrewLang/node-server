import { Server } from './server';

export class Bootstrap {

    constructor() {
        console.log('Bootstrap app...');


        let server = new Server();
        server.Start();
    }
}


export default new Bootstrap();