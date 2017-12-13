
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
