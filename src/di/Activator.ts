import { Type, IsType } from './Type';

export const DELEGATE_CTOR = /^function\s+\S+\(\)\s*{[\s\S]+\.apply\(this,\s*arguments\)/;

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

        console.log(type);
        const parentCtor = Activator.GetParentCtor(type);

        let parameters = Activator.GetOwnParameters(type, parentCtor);

        console.log(parameters)

        if (!parameters && parentCtor !== Object) {
            parameters = Activator.GetParameters(parentCtor);
        }
        return parameters || [];
    }
    /**
     * 
     * @param ctor 
     */
    public static GetParentCtor(ctor: Function): Type<any> {
        const parentProto = Object.getPrototypeOf(ctor.prototype);
        const parentCtor = parentProto ? parentProto.constructor : null;
        return parentCtor || Object;
    }
    /**
     * 
     * @param type 
     * @param parentCtor 
     */
    public static GetOwnParameters(type: Type<any>, parentCtor: any): any[][] | null {
        if (!type) {
            throw new Error(`Argument type is null`);
        }
        if (!parentCtor) {
            throw new Error(`Argument parentCtor is null`);
        }
        // If we have no decorators, we only have function.length as metadata.
        // In that case, to detect whether a child class declared an own constructor or not,
        // we need to look inside of that constructor to check whether it is
        // just calling the parent.
        // This also helps to work around for https://github.com/Microsoft/TypeScript/issues/12439
        // that sets 'design:paramtypes' to []
        // if a class inherits from another class but has no ctor declared itself.

        if (DELEGATE_CTOR.exec(type.toString())) {
            return null;
        }

        console.log((<any>type).parameters)
        // Prefer the direct API.
        if ((<any>type).parameters && (<any>type).parameters !== parentCtor.parameters) {
            console.log('direct API')
            return (<any>type).parameters;
        } else {
            console.log(`Direct API doesn't work`)
           
        }

        // API of tsickle for lowering decorators to properties on the class.
        const tsickleCtorParams = (<any>type).ctorParameters;
        if (tsickleCtorParams && tsickleCtorParams !== parentCtor.ctorParameters) {
            // Newer tsickle uses a function closure
            // Retain the non-function case for compatibility with older tsickle
            const ctorParameters = typeof tsickleCtorParams === 'function' ? tsickleCtorParams() : tsickleCtorParams;
            const paramTypes = ctorParameters.map((ctorParam: any) => ctorParam && ctorParam.type);
            const paramAnnotations = ctorParameters.map(
                (ctorParam: any) => ctorParam && Activator.convertTsickleDecoratorIntoMetadata(ctorParam.decorators));
            return Activator._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }

        // API for metadata created by invoking the decorators.
        // const paramAnnotations = type.hasOwnProperty(PARAMETERS) && (type as any)[PARAMETERS];
        // const paramTypes = this._reflect && this._reflect.getOwnMetadata &&
        //     this._reflect.getOwnMetadata('design:paramtypes', type);
        // if (paramTypes || paramAnnotations) {
        //     return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        // }

        // If a class has no decorators, at least create metadata
        // based on function.length.
        // Note: We know that this is a real constructor as we checked
        // the content of the constructor above.
        return new Array((<any>type.length)).fill(undefined);
    }

    static convertTsickleDecoratorIntoMetadata(decoratorInvocations: any[]): any[] {
        if (!decoratorInvocations) {
          return [];
        }
        return decoratorInvocations.map(decoratorInvocation => {
          const decoratorType = decoratorInvocation.type;
          const annotationCls = decoratorType.annotationCls;
          const annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
          return new annotationCls(...annotationArgs);
        });
      }

    static  _zipTypesAndAnnotations(paramTypes: any[], paramAnnotations: any[]): any[][] {
        let result: any[][];
    
        if (typeof paramTypes === 'undefined') {
          result = new Array(paramAnnotations.length);
        } else {
          result = new Array(paramTypes.length);
        }
    
        for (let i = 0; i < result.length; i++) {
          // TS outputs Object for parameters without types, while Traceur omits
          // the annotations. For now we preserve the Traceur behavior to aid
          // migration, but this can be revisited.
          if (typeof paramTypes === 'undefined') {
            result[i] = [];
          } else if (paramTypes[i] != Object) {
            result[i] = [paramTypes[i]];
          } else {
            result[i] = [];
          }
          if (paramAnnotations && paramAnnotations[i] != null) {
            result[i] = result[i].concat(paramAnnotations[i]);
          }
        }
        return result;
      }
}