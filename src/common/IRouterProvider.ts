import * as express from "express";

export interface IRouterProvider {

    /** Initialize router */
    Build(options?: any): express.Router;
}