
import { Type } from './Type';

export interface IServiceProvider {
    GetService(serviceType: Type<any>): any;
    GetService<T>(): any;
}