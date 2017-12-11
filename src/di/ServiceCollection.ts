import { IServiceCollection } from './IServiceCollection';
import { ServiceDescriptor } from './ServiceDescriptor';
import { ServiceToken } from './ServiceToken';


export class ServiceCollection implements IServiceCollection {
    private serviceTable = new Map<ServiceDescriptor, any>();
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

    // TryResolve( serviceType)
}