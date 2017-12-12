import { Type } from './Type';
import { ServiceToken } from './ServiceToken';


export class ServiceDescriptor {
    Name: string;
    Token: ServiceToken;
    ServiceType: Type<any>;
    ImplementationType: Type<any>;
    ImplementationInstance: any;
    ImplementationFactory: (serviceProvider?: any) => any;


    // static Singleton(service: Type<any>, implementationFactory: (serviceProvider?: any) => any): ServiceDescriptor ;
    static Singleton(service: Type<any>, implementation: Type<any>, implementationFactory: (serviceProvider?: any) => any): ServiceDescriptor {
        let descriptor = new ServiceDescriptor();

        return descriptor;
    }
}