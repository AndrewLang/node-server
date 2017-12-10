
import * as exporess from "express";


export class Server {

    public App: exporess.Application;


    constructor() {
        this.App = exporess();
    }

    public Start(): void {

    }
}