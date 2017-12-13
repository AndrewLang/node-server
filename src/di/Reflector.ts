import 'reflect-metadata';
import { KnownKeys } from './KnownKeys';


export class Reflector {

    static GetMetadata(metadataKey: string, target: any, key?: string | symbol): any {
        let types = Reflect.getMetadata(metadataKey, target, key);
        
        return types;
    }
    static GetOwnMetadata(metadataKey: string, target: any, key: string): any {
        return Reflect.getOwnMetadata(metadataKey, target, key);
    }
    static DefineMetadata(metadataKey: string, metadataValue: any, target: any, propertyKey?: string) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    static HasOwnMetadata(metadataKey, target): boolean {
        return Reflect.hasOwnMetadata(metadataKey, target);
    }
    static GetFunctionMetadata(func: Function) {
        return Reflector.GetMetadata(KnownKeys.ParamTypes, func);
    }
    static GetFunctionTaggedMetadata(func: Function) {
        return Reflector.GetMetadata(KnownKeys.TaggedTypes, func);
    }
}