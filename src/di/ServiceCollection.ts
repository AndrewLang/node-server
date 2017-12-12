import { IServiceCollection } from './IServiceCollection';
import { ServiceDescriptor } from './ServiceDescriptor';
import { ServiceToken } from './ServiceToken';
import { Activator } from './Activator';
import { Type } from './Type';



export class ServiceCollection implements IServiceCollection {

    private nameTokenMapping = new Map<string, ServiceToken>();
    private typeMapping = new Map<Type<any>, Type<any>[]>();
    private tokenTable = new Map<ServiceToken, ServiceDescriptor>();
    private instanceTable = new Map<ServiceToken, any>();

    Services: ServiceDescriptor[] = [];

    Add(descriptor: ServiceDescriptor): void {
        if (!descriptor) {
            throw new Error(`Null parameter of 'descriptor'`);
        }

        if (descriptor.Name && descriptor.Token) {
            this.nameTokenMapping.set(descriptor.Name, descriptor.Token);
        }
        
        this.tokenTable.set(descriptor.Token, descriptor);
    }

    TryResolve<TService>(serviceToken: ServiceToken): TService {
        if (!serviceToken) {
            return null;
        }

        if (this.instanceTable.has(serviceToken)) {
            return this.instanceTable.get(serviceToken);
        }

        if (this.tokenTable.has(serviceToken)) {
            let descriptor = this.tokenTable.get(serviceToken);
            let instance: any;
            if (descriptor.ImplementationInstance) {
                //  resolve instance directly
                instance = descriptor.ImplementationInstance;
                this.instanceTable.set(serviceToken, instance);
            } else if (descriptor.ImplementationFactory) {
                // resolve instance by registered factory
                instance = descriptor.ImplementationFactory();
                this.instanceTable.set(serviceToken, instance);
            } else if (descriptor.ImplementationType) {
                // resolve instance by implementation type

                let dependencies = this.ResolveDependicies(descriptor);

                instance = Activator.Createinstance<TService>(descriptor.ImplementationType, ...dependencies);

                this.instanceTable.set(serviceToken, instance);
            }

            return instance;
        }
    }

    // private ResolveInternal(descriptor: ServiceDescriptor): any {
    //     if (!descriptor) {
    //         return null;
    //     }

    //     let instance: any;
    //     if (descriptor.ImplementationInstance) {
    //         //  resolve instance directly
    //         instance = descriptor.ImplementationInstance;
    //         this.instanceTable.set(serviceToken, instance);
    //     } else if (descriptor.ImplementationFactory) {
    //         // resolve instance by registered factory
    //         instance = descriptor.ImplementationFactory();
    //         this.instanceTable.set(serviceToken, instance);
    //     }
    //     return instance;
    // }
    private ResolveDependicies(descriptor: ServiceDescriptor): any[] {
        let result = [];

        let params = Activator.GetParameters(descriptor.ImplementationType);

        console.log(params);

        return result;
    }
}