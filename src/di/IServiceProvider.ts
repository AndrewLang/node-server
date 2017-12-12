

import { ServiceToken } from './index';

export interface IServiceProvider {
    GetService(serviceToken: ServiceToken): any;
    GetService<T>(serviceToken: ServiceToken): T;
}