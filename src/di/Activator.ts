import { Type } from './Type';


export class Activator {

    static Createinstance<T>(type: Type<T>, ...args: any[]): T {
        let factory = Activator.Factory(type);
        
        return factory(...args);
    }

    private static Factory<T>(t: Type<T>): (...args: any[]) => T {
        return (...args: any[]) => new t(...args);
    }
}