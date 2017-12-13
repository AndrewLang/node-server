export interface ServiceToken {
    Token: string;
}


// export const TokenCrator: (token: string) => () => ServiceToken = (token: string): () => ServiceToken => {
//     return () => { return { Token: token } };
// };

export const Service = function (token: string) {
    console.log(`token creator`);
    console.log(token);
    return function (target: object, property: string, index: number) {
        // return { Token: token };
        console.log(target);
        console.log(property);
        console.log(index);
    }
};