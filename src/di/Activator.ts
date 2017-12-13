import { Type, IsType } from './Type';
import { Reflector } from './Reflector';
import * as Models from './Models';

export class Activator {

    /**
     * 
     * @param type 
     * @param args 
     */
    static Createinstance<T>(type: Type<T>, ...args: any[]): T {
        let factory = Activator.Factory(type);

        return factory(...args);
    }
    /** Factory of creating object instance with arguments */
    public static Factory<T>(t: Type<T>): (...args: any[]) => T {
        return (...args: any[]) => new t(...args);
    }
    /**
     * Get parameters
     * @param type 
     */
    public static GetParameters(type: Type<any>): any[][] {
        // Note: only report metadata if we have at least one class decorator
        // to stay in sync with the static reflector.
        if (!IsType(type)) {
            return [];
        }

        return [];
    }

    public static GetFunctionName(func: any): string {
        if (func.name) {
            return func.name;
        } else {
            const name = func.toString();
            const match = name.match(/^function\s*([^\s(]+)/);
            return match ? match[1] : `Anonymous function: ${name}`;
        }
    }
    /**
     * 
     * @param constructor 
     */
    public static GetConstructorMetadata(constructor: Function): Models.ConstructorMetadata {
        return {
            CompilerData: Reflector.GetFunctionMetadata(constructor),
            UserData: Reflector.GetFunctionTaggedMetadata(constructor) || {}
        };
    }
}