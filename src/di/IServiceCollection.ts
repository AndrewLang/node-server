
import { ServiceDescriptor } from './ServiceDescriptor';

export interface IServiceCollection {
    /** get services */
    Services: ServiceDescriptor[];

    /** Add service descriptor */
    Add(descriptor: ServiceDescriptor): void;
}