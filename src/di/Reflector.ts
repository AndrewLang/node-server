import 'reflect-metadata';

export const ReflectType = 'design:type';
export const ReflectParamTypes = 'design:paramtypes';
export const ReflectReturn = 'design:returntype';

export class Reflector {
    
    static GetMetadata(metadataKey: string, target: any, key: string): any {
        let types = Reflect.getMetadata(ReflectType, target, key);
        return types;
    }
    static GetOwnMetadata(metadataKey: string, target: any, key: string): any {
        return Reflect.getOwnMetadata(metadataKey, target, key);
    }
    static DefineMetadata(metadataKey: string, metadataValue: any, target: any, propertyKey: string) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    }
}