
export interface Metadata {
    Key: string | number | symbol;
    Value: any;
}

export interface MetadataMap {
    [name: string]: Metadata[];
}

export interface ConstructorMetadata {
    CompilerData: Function[] | undefined;
    UserData: MetadataMap;
}

export interface IMethodDescriptor {
    Name: string;
    Token?: any;
    Creator?: Function;
}
export interface IParameterDescriptor {
    Index: number;
    Name: string;
    Key: string;
    Value: any;
}