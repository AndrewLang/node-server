import { IServiceContainer } from './IServiceContainer';
import { ServiceDescriptor } from './ServiceDescriptor';
import { ServiceToken } from './ServiceToken';
import { Activator } from './Activator';
import { Type } from './Type';
import { IServiceProvider } from './IServiceProvider';



export class ServicecContainer implements IServiceContainer, IServiceProvider {


    private nameTokenMapping = new Map<string, ServiceToken>();
    private typeMapping = new Map<Type<any>, Type<any>[]>();
    private tokenTable = new Map<ServiceToken, ServiceDescriptor>();
    private instanceTable = new Map<ServiceToken, any>();

    constructor() {
        this.Register(ServiceDescriptor.Singleton({ Token: 'IServiceContainer' }).UseInstance(this))
            .Register(ServiceDescriptor.Singleton({ Token: 'IServiceProvider' }).UseInstance(this));
    }

    Register(descriptor: ServiceDescriptor): IServiceContainer {
        if (!descriptor) {
            throw new Error(`Null parameter of 'descriptor'`);
        }

        if (descriptor.Name && descriptor.Token) {
            this.nameTokenMapping.set(descriptor.Name, descriptor.Token);
        }

        this.tokenTable.set(descriptor.Token, descriptor);

        return this;
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
                instance = descriptor.ImplementationFactory(this);
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
    GetService(serviceToken: ServiceToken);
    GetService<T>(serviceToken: ServiceToken): T;
    GetService(serviceToken: any) {
        return this.TryResolve(serviceToken);
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

        console.log(`service parameters`);
        console.log(params);

        return result;
    }
}