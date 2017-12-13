import { Reflector } from './Reflector';

export interface ServiceToken {
    Token: string;
}


// export const TokenCrator: (token: string) => () => ServiceToken = (token: string): () => ServiceToken => {
//     return () => { return { Token: token } };
// };
export const ServiceTokenKey = 'MatrixServiceToken';
export const Service = function (token: string) {
    return function (target: object, property: string, index: number) {
        let data = Reflector.GetOwnMetadata(ServiceTokenKey, target, property);
        if (!data) {
            Reflector.DefineMetadata(ServiceTokenKey, token, target, property);
        }
    }
};
export const GetServiceToken = (target, property) => {
    let data = Reflector.GetOwnMetadata(ServiceTokenKey, target, property);
    return data;
}