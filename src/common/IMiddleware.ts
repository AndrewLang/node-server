import * as express from "express";

export interface IMiddleware {

    Process(request: express.Request, response: express.Response, next: () => void): void;
}