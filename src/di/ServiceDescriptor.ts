import { Type } from './Type';
import { ServiceToken } from './ServiceToken';


export class ServiceDescriptor {
    Name: string;
    Token: ServiceToken;
    ServiceType: Type<any>;
    ImplementationType: Type<any>;
    ImplementationInstance: any;


}