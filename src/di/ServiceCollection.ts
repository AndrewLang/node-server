import { IServiceCollection } from './IServiceCollection';
import { ServiceDescriptor } from './ServiceDescriptor';
import { ServiceToken } from './ServiceToken';


export class ServiceCollection implements IServiceCollection {

    private nameTokenMapping = new Map<string, ServiceToken>();
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
                instance = descriptor.ImplementationInstance;
                this.instanceTable.set(serviceToken, instance);
            } else if (descriptor.ImplementationFactory) {
                instance = descriptor.ImplementationFactory();
                this.instanceTable.set(serviceToken, instance);
            } else if( descriptor.ImplementationType) {
                // descriptor.ImplementationType.arguments
            }

            return instance;
        }
    }
}