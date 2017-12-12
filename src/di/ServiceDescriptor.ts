import { Type } from './Type';
import { ServiceToken } from './ServiceToken';


export class ServiceDescriptor {
    Name: string;
    Token: ServiceToken;
    // ServiceType: Type<any>;
    ImplementationType: Type<any>;
    ImplementationInstance: any;
    ImplementationFactory: (serviceProvider?: any) => any;


    // static Singleton(service: Type<any>, implementationFactory: (serviceProvider?: any) => any): ServiceDescriptor ;
    static Singleton(token: ServiceToken, implementation: Type<any>, name?: string, instance?: any, implementationFactory?: (serviceProvider?: any) => any): ServiceDescriptor {
        let descriptor = new ServiceDescriptor();
        descriptor.Token = token;
        descriptor.ImplementationType = implementation;
        descriptor.ImplementationFactory = implementationFactory;
        descriptor.Name = name;
        descriptor.ImplementationInstance = instance;
        return descriptor;
    }
}